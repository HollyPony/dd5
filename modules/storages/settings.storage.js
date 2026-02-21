import createLocalStorage from './createLocalStorage.js'

const PREFIX_KEY = 'settings'

const storage = createLocalStorage(PREFIX_KEY)

export default {
  save: function (settings) {
    storage.setJSONItem('', settings)
  },
  load: function () {
    return storage.getJSONItem('')
  },
  on: storage.on,
} 
