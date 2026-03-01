import googleProvider from './google.provider.js'
import authStore, { AUTH_STATUS } from './auth.store.js'
import createEventBus from '../createEventBus.js'
import supabaseClient from '../supabase.client.js'

const AUTH_INITIALIZED = 'initialized'
const USER_CONNECTED = 'userConnected'
const USER_DISCONNECTED = 'userDisconnected'
const USER_DISCONNECTING = 'userDisconnecting'
const eventBus = createEventBus()
const providers = {
  [googleProvider.providerId]: googleProvider,
}
const events = []

async function signInWithProviderPayload(payload) {
  const { data, error } = await supabaseClient.auth.signInWithIdToken({
    provider: payload?.providerId,
    token: payload.idToken,
  })
  if (error) throw error
  if (!data?.user?.id) throw new Error('Supabase sign-in response is missing user id.')
}

function handleProviderCredential(providerCredential) {
  signInWithProviderPayload(providerCredential)
    .then(() => {
      authStore.setProviderAuth(providerCredential)
      eventBus.emit(USER_CONNECTED)
    })
}

function unsubscribe() {
  for (const event of events) event()
  events.length = 0
}

async function supabaseAuthChanged(event, session) {
  const providerId = authStore.getProviderAuth().providerId
  const provider = providers[providerId]

  const userId = session?.user?.id
  if (event === 'SIGNED_OUT' || !userId) {
    await provider?.signOut()
    authStore.reset()
    eventBus.emit(USER_DISCONNECTED)
    return
  }

  authStore.setSupabaseAuth({ providerId, userId })

  // switch (event) {
  //   case 'SIGNED_OUT':
  //   case 'PASSWORD_RECOVERY':
  //   case 'TOKEN_REFRESHED':
  //   case 'INITIAL_SESSION':
  //   case 'SIGNED_IN':
  //   case 'USER_UPDATED':
  //   default:
  // }
}

async function init() {
  unsubscribe()

  if (!supabaseClient) {
    authStore.reset()
    return () => { }
  }

  const { data: { subscription } } = supabaseClient.auth.onAuthStateChange(supabaseAuthChanged)

  events.push(subscription.unsubscribe)

  const inits = []
  for (const provider of Object.values(providers)) {
    if (!provider.isConfigured()) continue

    events.push(provider.onCredential(handleProviderCredential))
    inits.push(provider.init())
  }

  await Promise.all(inits)

  eventBus.emit(AUTH_INITIALIZED)

  return unsubscribe
}

async function signIn(providerId) {
  await providers[providerId].signInInteractive()
}

async function signOut() {
  await eventBus.emit(USER_DISCONNECTING)

  try {
    const provider = providers[authStore.getProviderAuth().providerId]
    await provider?.signOut()

    const { error } = await supabaseClient.auth.signOut()
    if (error) throw error
  } catch (error) {
    authStore.reset()
    eventBus.emit(USER_DISCONNECTED)
    throw error
  }
}

export default {
  init,
  getProviders: () => Object.values(providers),
  get isAuthenticated() {
    return authStore.getProviderAuth().status === AUTH_STATUS.authenticated && authStore.getSupabaseAuth().status === AUTH_STATUS.authenticated
  },
  get providerUser() {
    return authStore.getProviderAuth().user
  },
  get supabaseUserId() {
    return authStore.getSupabaseAuth().userId
  },
  signIn, signOut,
  onInitialized: callback => eventBus.on(AUTH_INITIALIZED, callback),
  onUserConnected: callback => eventBus.on(USER_CONNECTED, callback),
  onUserDisconnecting: callback => eventBus.on(USER_DISCONNECTING, callback),
  onUserDisconnected: callback => eventBus.on(USER_DISCONNECTED, callback),
}
