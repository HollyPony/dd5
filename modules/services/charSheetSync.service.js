import charSheetSupabase from '../storages/charSheet.supabase.js'
import charSheetStorage from '../storages/charSheet.storage.js'
import { createCustomError, errorKeys } from '../errors.js'

export const SYNC_STATUS = {
  synced: 'synced',
  conflict: 'conflict',
}

export const SYNC_CHOICES = {
  local: 'local',
  remote: 'remote',
  both: 'both',
}

/**
 * @param {string} entryId
 * @param {{ id: string, updatedAt: number, syncBaseUpdatedAt: number, data: object }} localEntry
 * @param {{ id: string, updatedAt: number, syncBaseUpdatedAt: number, data: object }} remoteEntry
 */
function createConflictState(entryId, localEntry, remoteEntry) {
  return {
    status: SYNC_STATUS.conflict,
    entryId,
    localEntry,
    remoteEntry,
  }
}

function copyEntry(entry) {
  const { version, data } = entry
  data.name += ' (copy)'
  const updatedAt = Date.now()
  return {
    id: charSheetStorage.createId(),
    updatedAt,
    syncBaseUpdatedAt: updatedAt,
    version,
    data,
  }
}

async function synchronizeEntry(entryId) {
  const localEntry = charSheetStorage.getEntry(entryId)
  const remoteEntry = await charSheetSupabase.load(entryId)

  if (!localEntry && !remoteEntry)
    throw createCustomError({
      name: 'SyncEntryNotFoundError',
      code: errorKeys.sync.entryNotFound,
      interpolations: { entryId },
    })

  if (!localEntry) {
    remoteEntry.syncBaseUpdatedAt = remoteEntry.updatedAt
    charSheetStorage.saveEntry(remoteEntry)
    return { status: SYNC_STATUS.synced, entryId }
  }

  if (!remoteEntry) {
    await charSheetSupabase.save(localEntry)
    charSheetStorage.markAsSync(localEntry)
    return { status: SYNC_STATUS.synced, entryId }
  }

  const localSyncUpdatedAt = localEntry.syncBaseUpdatedAt
  const localChanged = localEntry.updatedAt !== localSyncUpdatedAt
  const remoteChanged = remoteEntry.updatedAt !== localSyncUpdatedAt

  if (localChanged && remoteChanged) {
    return createConflictState(entryId, localEntry, remoteEntry)
  }

  if (localChanged) {
    await charSheetSupabase.save(localEntry)
    charSheetStorage.markAsSync(localEntry)
    return { status: SYNC_STATUS.synced, entryId }
  }

  if (remoteChanged) {
    remoteEntry.syncBaseUpdatedAt = remoteEntry.updatedAt
    charSheetStorage.saveEntry(remoteEntry)
    return { status: SYNC_STATUS.synced, entryId }
  }

  return { status: SYNC_STATUS.synced, entryId }
}

async function synchronizeEntries(entryIds) {
  return Promise.allSettled(entryIds.map(synchronizeEntry))
    .then(results => {
      const failures = results
        .filter(result => result.status === 'rejected')
        .map(result => result.reason)
      // TODO: Manage / handle this
      if (failures.length)
        throw createCustomError({
          name: 'SyncBatchError',
          code: errorKeys.sync.batchFailed,
          interpolations: { count: failures.length },
          cause: failures,
        })

      return results
        .filter(result => result.status === 'fulfilled')
        .map(result => result.value)
    })
}

async function resolveConflicts(resolutions) {
  for (const { choice, entryId } of resolutions) {
    switch (choice) {
      case SYNC_CHOICES.local:
        const localEntry = charSheetStorage.getEntry(entryId)
        await charSheetSupabase.save(localEntry)
        charSheetStorage.markAsSync(localEntry)
        break
      case SYNC_CHOICES.remote: {
        const remoteEntry = await charSheetSupabase.load(entryId)
        remoteEntry.syncBaseUpdatedAt = remoteEntry.updatedAt
        charSheetStorage.saveEntry(remoteEntry)
        break
      }
      case SYNC_CHOICES.both: {
        const remoteEntry = await charSheetSupabase.load(entryId)
        const duplicatedEntry = copyEntry(charSheetStorage.getEntry(entryId))
        await charSheetSupabase.save(duplicatedEntry)
        remoteEntry.syncBaseUpdatedAt = remoteEntry.updatedAt
        charSheetStorage.saveEntry(remoteEntry)
        charSheetStorage.saveEntry(duplicatedEntry)
        break
      }
      default:
        throw createCustomError({
          name: 'SyncConflictChoiceError',
          code: errorKeys.sync.unsupportedChoice,
          interpolations: { choice },
        })
    }
  }
}

export default {
  synchronizeEntry,
  synchronizeEntries,
  resolveConflicts,
}
