import charSheetCloud from '../storages/charSheet.cloud.js'
import charSheetStorage from '../storages/charSheet.storage.js'

export default function charSheetSyncFactory(resolveConflict) {
  async function synchronizeEntry(entryId) {
    const localEntry = charSheetStorage.getEntry(entryId)
    const cloudEntry = await charSheetCloud.load(entryId)

    if (!cloudEntry) {
      await charSheetCloud.save(localEntry)
      return
    }

    if (cloudEntry.updatedAt === localEntry.updatedAt) return

    const choice = resolveConflict(localEntry, cloudEntry)
    switch (choice) {
      case 'local':
        await charSheetCloud.save(localEntry)
        return
      case 'cloud': {
        charSheetStorage.saveEntry(cloudEntry)
        return
      }
      case 'both': {
        const duplicatedEntry = charSheetStorage.copy(entryId)
        charSheetStorage.saveEntry(cloudEntry)
        await charSheetCloud.save(duplicatedEntry)
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
