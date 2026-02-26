import charSheetSupabase from '../storages/charSheet.supabase.js'
import charSheetStorage from '../storages/charSheet.storage.js'

export default function charSheetSyncFactory(resolveConflict) {
  async function synchronizeEntry(entryId) {
    const localEntry = charSheetStorage.getEntry(entryId)
    const cloudEntry = await charSheetSupabase.load(entryId)

    if (!cloudEntry) {
      await charSheetSupabase.save(localEntry)
      return
    }

    if (cloudEntry.updatedAt === localEntry.updatedAt) return

    const choice = resolveConflict(localEntry, cloudEntry)
    switch (choice) {
      case 'local':
        await charSheetSupabase.save(localEntry)
        return
      case 'cloud': {
        charSheetStorage.saveEntry(cloudEntry)
        return
      }
      case 'both': {
        const duplicatedEntry = charSheetStorage.copy(entryId)
        charSheetStorage.saveEntry(cloudEntry)
        await charSheetSupabase.save(duplicatedEntry)
        return
      }
      default:
        throw new Error(`Unsupported conflict choice '${choice}'.`)
    }
  }

  return Promise.allSettled(
    charSheetStorage.getSheetList()
      .map(item => item.id)
      .map(synchronizeEntry)
  ).then(results => {
    const failures = results
      .filter(result => result.status === 'rejected')
      .map(result => result.reason)

    // TODO: Manage / handle this
    if (failures.length)
      throw new AggregateError(failures, 'Some sheet synchronizations failed.')

    return {
      synchronizeEntry,
    }
  })
}
