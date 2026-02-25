import supabaseClient from '../supabase.client.js'
import createEventBus from '../createEventBus.js'
import createStore from '../createStore.js'

const CLOUD_AUTH_STATUS = {
  anonymous: 'anonymous',
  authenticated: 'authenticated',
}

const store = createStore(createAnonymousState(), createEventBus())
let authStateOff = null

function createAnonymousState() {
  return {
    status: CLOUD_AUTH_STATUS.anonymous,
    providerId: null,
    userId: null,
  }
}

function setAuthenticated(providerId, userId) {
  if (!providerId) throw new Error('Cloud authenticated state is missing providerId.')
  if (!userId) throw new Error('Cloud authenticated state is missing userId.')

  store.set({
    status: CLOUD_AUTH_STATUS.authenticated,
    providerId,
    userId,
  })
}

function reset() {
  store.set(createAnonymousState())
}

function setAuthenticatedFromSession(session) {
  const userId = session?.user?.id
  if (!userId) {
    reset()
    return
  }

  const providerId = session.user?.app_metadata?.provider ?? 'supabase'
  setAuthenticated(providerId, userId)
}

function init() {
  authStateOff?.()
  authStateOff = null

  if (!supabaseClient) {
    reset()
    return () => {}
  }

  const { data: { subscription } } = supabaseClient.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_OUT') {
      reset()
      return
    }

    if (event === 'INITIAL_SESSION' && !store.get().userId) return
    if (!store.get().userId && event !== 'SIGNED_IN') return

    setAuthenticatedFromSession(session)
  })

  authStateOff = () => subscription.unsubscribe()
  return authStateOff
}

async function signInWithProviderPayload(payload) {
  if (!supabaseClient) throw new Error('Supabase client is not configured.')

  switch (payload?.providerId) {
    case 'google': {
      const { data, error } = await supabaseClient.auth.signInWithIdToken({
        provider: 'google',
        token: payload.idToken,
      })
      if (error) throw error
      if (!data?.user?.id) throw new Error('Supabase sign-in response is missing user id.')
      setAuthenticated(payload.providerId, data.user.id)
      return store.get()
    }
    default:
      throw new Error(`Unsupported cloud auth provider '${String(payload?.providerId)}'.`)
  }
}

async function signOut() {
  if (supabaseClient) {
    const { error } = await supabaseClient.auth.signOut()
    if (error) throw error
  }
  reset()
}

export default {
  init,
  get isAuthenticated() {
    return store.get().status === CLOUD_AUTH_STATUS.authenticated
  },
  get userId() {
    return store.get().userId
  },
  signInWithProviderPayload,
  signOut,
  on(callback) {
    const any = store.onAny(() => callback())
    return () => any.off()
  },
}
