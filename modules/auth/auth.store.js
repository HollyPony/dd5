import createEventBus from '../createEventBus.js'
import createStore from '../createStore.js'

const PROVIDER_AUTH = 'providerAuth'
const SUPABASE_AUTH = 'supabaseAuth'

export const AUTH_STATUS = {
  anonymous: 'anonymous',
  authenticated: 'authenticated',
}

const store = createStore(createAnonymousState(), createEventBus())

function createAnonymousState() {
  return {
    [PROVIDER_AUTH]: {
      status: AUTH_STATUS.anonymous,
      providerId: null,
      idToken: null,
      claims: null,
      user: null,
    },
    [SUPABASE_AUTH]: {
      status: AUTH_STATUS.anonymous,
      providerId: null,
      userId: null,
    }
  }
}

/**
 * @param {{ providerId: string, idToken: string, claims: Record<string, any>, user: { id: string, displayName: string, email: string, picture: string } }} payload
 * @returns {void}
 */
function setProviderAuth(payload) {
  if (!payload?.providerId) throw new Error('Authenticated payload is missing providerId.')
  if (!payload?.idToken) throw new Error('Authenticated payload is missing idToken.')
  if (!payload?.claims) throw new Error('Authenticated payload is missing claims.')
  if (!payload?.user?.id) throw new Error('Authenticated payload is missing user.id.')

  store.set({
    [PROVIDER_AUTH]: {
      status: AUTH_STATUS.authenticated,
      providerId: payload.providerId,
      idToken: payload.idToken,
      claims: payload.claims,
      user: payload.user,
    }
  })
}

function setSupabaseAuth(payload) {
  if (!payload?.providerId) throw new Error('Supabase authenticated state is missing providerId.')
  if (!payload?.userId) throw new Error('Supabase authenticated state is missing userId.')

  store.set({
    [SUPABASE_AUTH]: {
      status: AUTH_STATUS.authenticated,
      providerId: payload.providerId,
      userId: payload.userId,
    }
  })
}

/**
 * @returns {void}
 */
function reset() {
  store.set(createAnonymousState())
}

export default {
  setProviderAuth,
  getProviderAuth: () => store.get(PROVIDER_AUTH),
  setSupabaseAuth,
  getSupabaseAuth: () => store.get(SUPABASE_AUTH),
  reset,
  on: store.on,
  onAny: store.onAny,
}
