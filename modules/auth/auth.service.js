import googleProvider from './google.provider.js'
import authSupabaseService from './auth.supabase.service.js'
import authStore from './auth.store.js'
import createEventBus from '../createEventBus.js'
import { throwAsync } from '../errors.js'

const AUTH_INITIALIZED = 'initialized'
const USER_CONNECTED = 'userConnected'
const USER_DISCONNECTED = 'userDisconnected'
const eventBus = createEventBus()
const providers = {
  [googleProvider.providerId]: googleProvider,
}
const enabledProviderIds = new Set()
const events = []

function handleProviderCredential(providerCredential) {
  authSupabaseService.signInWithProviderPayload(providerCredential)
    .then(() => {
      authStore.setAuthenticated(providerCredential)
      eventBus.emit(USER_CONNECTED)
    })
    .catch(throwAsync)
}

function eventsClear() {
  for (const event of events) event()
  events.length = 0
}

async function init() {
  enabledProviderIds.clear()
  eventsClear()
  events.push(authSupabaseService.init())

  const inits = []
  for (const [providerId, provider] of Object.entries(providers)) {
    if (!provider.isConfigured()) continue

    enabledProviderIds.add(providerId)
    events.push(provider.onCredential(handleProviderCredential))
    inits.push(provider.init())
  }

  await Promise.all(inits)

  eventBus.emit(AUTH_INITIALIZED)

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
  await authSupabaseService.signOut()
  authStore.reset()
  eventBus.emit(USER_DISCONNECTED)
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
  onInitialized: callback => eventBus.on(AUTH_INITIALIZED, callback),
  onUserConnected: callback => eventBus.on(USER_CONNECTED, callback),
  onUserDisconnected: callback => eventBus.on(USER_DISCONNECTED, callback),
}
