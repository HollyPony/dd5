import googleProvider from './google.provider.js'
import authStore, { AUTH_STATUS } from './auth.store.js'
import createEventBus from '../createEventBus.js'
import createLocalStorage from '../storages/createLocalStorage.js'
import { createCustomError, errorKeys } from '../errors.js'
import env from '../env.js'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const AUTH_INITIALIZED = 'initialized'
const USER_CONNECTED = 'userConnected'
const USER_DISCONNECTED = 'userDisconnected'
const USER_DISCONNECTING = 'userDisconnecting'
const AUTH_STORAGE_PREFIX = 'auth'
const REMEMBERED_PROVIDER_STORAGE_KEY = 'rememberedProviderId'
const supabaseProjectUrl = env.SUPABASE_PROJECT_URL
const supabasePublicKey = env.SUPABASE_PUBLIC_KEY
const eventBus = createEventBus()
const storage = createLocalStorage(AUTH_STORAGE_PREFIX)
const providers = {
  [googleProvider.providerId]: googleProvider,
}
const events = []
let supabaseClient = null

function storedProviderId() {
  return storage.getItem(REMEMBERED_PROVIDER_STORAGE_KEY)
}

function rememberProviderId(providerId) {
  storage.setItem(REMEMBERED_PROVIDER_STORAGE_KEY, providerId)
}

function forgetProviderId() {
  storage.removeItem(REMEMBERED_PROVIDER_STORAGE_KEY)
}

async function tryRestoreRememberedProviderSession() {
  const rememberedProviderId = storedProviderId()
  const rememberedProvider = providers[rememberedProviderId]
  if (!rememberedProvider?.isConfigured() || !rememberedProvider?.restoreSession) return false

  await rememberedProvider.restoreSession()
  return true
}

/**
 * Create a runtime Supabase client using non-persistent auth sessions.
 * @returns {import('https://esm.sh/@supabase/supabase-js@2').SupabaseClient|null}
 */
function initSupabaseClient() {
  if (!supabaseProjectUrl || !supabasePublicKey) {
    supabaseClient = null
    return null
  }
  if (supabaseClient) return supabaseClient

  supabaseClient = createClient(supabaseProjectUrl, supabasePublicKey, {
    auth: {
      persistSession: false,
    },
  })

  return supabaseClient
}

/**
 * Exchange a provider credential for a Supabase user session.
 * @param {{ providerId: string, idToken: string }} payload
 * @returns {void}
 */
async function signInWithProviderPayload(payload) {
  const { data, error } = await supabaseClient.auth.signInWithIdToken({
    provider: payload?.providerId,
    token: payload.idToken,
  })
  if (error) throw error
  if (!data?.user?.id) throw createCustomError({
    name: 'SupabaseSignInError',
    code: errorKeys.auth.supabaseSignInMissingUserId,
  })
  // TODO: setSupabase store > data.client ?
}

function handleProviderCredential(providerCredential) {
  signInWithProviderPayload(providerCredential)
    .then(() => {
      authStore.setProviderAuth(providerCredential)

      if (providerCredential.rememberMe)
        rememberProviderId(providerCredential.providerId)

      eventBus.emit(USER_CONNECTED)
    })
}

function unsubscribe() {
  for (const event of events) event()
  events.length = 0
}

function supabaseAuthChanged(event, session) {
  const userId = session?.user?.id
  const providerId = authStore.getProviderAuth().providerId

  if (event === 'SIGNED_OUT') {
    return providers[providerId].signOut()
      // TODO: Catch: if cannot signOut google ?
      .then(() => {
        forgetProviderId()
        authStore.reset()
        eventBus.emit(USER_DISCONNECTED)
      })
  }

  if (!userId || !providerId) return

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

function init() {
  initSupabaseClient()

  if (supabaseClient) {
    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange((event, session) => {
      supabaseAuthChanged(event, session)
      // TODO: catch ?
    })
    events.push(subscription.unsubscribe)
  }

  for (const provider of Object.values(providers)) {
    if (!provider.isConfigured()) continue

    events.push(provider.onCredential(handleProviderCredential))
  }

  return tryRestoreRememberedProviderSession()
    .catch(() => { })
    .then(() => {
      eventBus.emit(AUTH_INITIALIZED)
      return unsubscribe
    })
}

/**
 * Trigger an interactive provider sign-in flow.
 * @param {string} providerId
 * @param {{ rememberMe?: boolean }} [options]
 * @returns {Promise<void>}
 */
function signIn(providerId, options) {
  return providers[providerId].signInInteractive({
    rememberMe: options?.rememberMe ?? true,
  })
}

function signOut() {
  return eventBus.emit(USER_DISCONNECTING)
    .then(() => supabaseClient.auth.signOut())
    .then(({ error }) => {
      if (error) {
        providers[authStore.getProviderAuth().providerId]?.signOut().catch(() => { })
        forgetProviderId()
        authStore.reset()
        eventBus.emit(USER_DISCONNECTED)
        throw error
      }
    })
}

export default {
  init,
  getProviders: () => Object.values(providers),
  getSupabaseClient: () => supabaseClient,
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
