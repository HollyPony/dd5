import googleProvider from './google.provider.js'
import authStore from './auth.store.js'
import createEventBus from '../createEventBus.js'

const eventBus = createEventBus()
const providers = {
  [googleProvider.providerId]: googleProvider,
}
const enabledProviderIds = new Set()
const events = []

function eventsClear() {
  for (const event of events) event()
  events.length = 0
}

async function init() {
  enabledProviderIds.clear()
  eventsClear()

  const inits = []
  for (const [providerId, provider] of Object.entries(providers)) {
    if (!provider.isConfigured()) continue

    enabledProviderIds.add(providerId)
    events.push(provider.onCredential(authStore.setAuthenticated))
    inits.push(provider.init())
  }

  await Promise.all(inits)

  eventBus.emit('')

  return eventsClear
}

function getProviders() {
  return Object.values(providers)
}

async function signIn(providerId) {
  await providers[providerId].signInInteractive()
}

async function signOut() {
  const provider = providers[authStore.getState().providerId]
  if (provider) await provider.signOut()
  authStore.reset()
}

function on(callback) {
  const anySubscription = authStore.onAny(() => callback())
  const off = eventBus.on('', () => callback())

  return () => {
    off()
    return anySubscription.off()
  }
}

export default {
  init,
  getState: authStore.getState,
  getProviders: getProviders,
  get isAuthenticated() {
    return authStore.getState().status === 'authenticated'
  },
  get user() {
    return authStore.getState().user
  },
  signIn, signOut,
  on,
}
