import charSheetSupabase from '../storages/charSheet.supabase.js'
import charSheetStorage from '../storages/charSheet.storage.js'

const SYNC_STATUS = {
  synced: 'synced',
  conflict: 'conflict',
}

export const SYNC_CHOICES = {
  local: 'local',
  cloud: 'cloud',
  both: 'both',
}

/**
 * @param {string} entryId
 * @param {{ id: string, updatedAt: number, data: object }} localEntry
 * @param {{ id: string, updatedAt: number, data: object }} cloudEntry
 */
function createConflictState(entryId, localEntry, cloudEntry) {
  return {
    status: SYNC_STATUS.conflict,
    entryId,
    localEntry,
    cloudEntry,
  }
}

export default function charSheetSyncFactory() {
  async function synchronizeEntry(entryId) {
    const localEntry = charSheetStorage.getEntry(entryId)
    const cloudEntry = await charSheetSupabase.load(entryId)

    if (!localEntry && !cloudEntry)
      throw new Error(`CharSheet id not found ${entryId}`)

    if (!localEntry) {
      charSheetStorage.saveEntry(cloudEntry)
      return { status: SYNC_STATUS.synced, entryId }
    }

    if (!cloudEntry) {
      await charSheetSupabase.save(localEntry)
      return { status: SYNC_STATUS.synced, entryId }
    }

    if (cloudEntry.updatedAt === localEntry.updatedAt) {
      return { status: SYNC_STATUS.synced, entryId }
    }

    return createConflictState(entryId, localEntry, cloudEntry)
  }

  async function synchronizeEntries(entryIds) {
    return Promise.allSettled(entryIds.map(synchronizeEntry))
      .then(results => {
        const failures = results
          .filter(result => result.status === 'rejected')
          .map(result => result.reason)
        // TODO: Manage / handle this
        if (failures.length)
          throw new AggregateError(failures, 'Some sheet synchronizations failed.')

        return results
          .filter(result => result.status === 'fulfilled' && result.value.status === SYNC_STATUS.conflict)
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
        case SYNC_CHOICES.cloud: {
          const cloudEntry = await charSheetSupabase.load(entryId)
          charSheetStorage.saveEntry(cloudEntry)
          break
        }
        case SYNC_CHOICES.both: {
          const cloudEntry = await charSheetSupabase.load(entryId)
          const duplicatedEntry = charSheetStorage.copy(entryId)
          charSheetStorage.saveEntry(cloudEntry)
          await charSheetSupabase.save(duplicatedEntry)
          break
        }
        default:
          throw new Error(`Unsupported conflict choice '${choice}'.`)
      }
    }
  }

  return {
    synchronizeEntry,
    synchronizeEntries,
    resolveConflicts,
  }
}
