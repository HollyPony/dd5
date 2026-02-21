import createEventBus from '../createEventBus.js'
import { onError } from '../errors.js'
import settingsStorage from '../storages/settings.storage.js'

const eventBus = createEventBus()

const settings = settingsStorage.load() ?? {}
const shadowSettings = {}

onError(() => {
  if (!settings.debug && !shadowSettings.debug) {
    shadowSettings.debug = true
    eventBus.emit('')
  }
})

settingsStorage.on('', nextSettings => {
  Object.assign(settings, nextSettings)
  eventBus.emit('')
})

export default {
  get isDebug() { return Boolean(shadowSettings.debug || settings.debug) },
  save: () => settingsStorage.save(settings),
  onChange: callback => eventBus.onAny(callback).off,
}
