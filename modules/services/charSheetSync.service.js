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
 * @param {{ id: string, updatedAt: number, data: object }} localEntry
 * @param {{ id: string, updatedAt: number, data: object }} remoteEntry
 */
function createConflictState(entryId, localEntry, remoteEntry) {
  return {
    status: SYNC_STATUS.conflict,
    entryId,
    localEntry,
    remoteEntry,
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
    charSheetStorage.saveEntry(remoteEntry)
    return { status: SYNC_STATUS.synced, entryId }
  }

  if (!remoteEntry) {
    await charSheetSupabase.save(localEntry)
    return { status: SYNC_STATUS.synced, entryId }
  }

  if (remoteEntry.updatedAt === localEntry.updatedAt) {
    return { status: SYNC_STATUS.synced, entryId }
  }

  return createConflictState(entryId, localEntry, remoteEntry)
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
        break
      case SYNC_CHOICES.remote: {
        const remoteEntry = await charSheetSupabase.load(entryId)
        charSheetStorage.saveEntry(remoteEntry)
        break
      }
      case SYNC_CHOICES.both: {
        const remoteEntry = await charSheetSupabase.load(entryId)
        const duplicatedEntry = charSheetStorage.copy(entryId)
        charSheetStorage.saveEntry(remoteEntry)
        await charSheetSupabase.save(duplicatedEntry)
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
