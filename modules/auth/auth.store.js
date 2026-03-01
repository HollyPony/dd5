import createEventBus from '../createEventBus.js'
import createStore from '../createStore.js'
import { createCustomError, errorKeys } from '../errors.js'

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
  if (!payload?.providerId) throw createCustomError({
    name: 'AuthProviderPayloadError',
    code: errorKeys.auth.providerPayloadMissingProviderId,
  })
  if (!payload?.idToken) throw createCustomError({
    name: 'AuthProviderPayloadError',
    code: errorKeys.auth.providerPayloadMissingIdToken,
  })
  if (!payload?.claims) throw createCustomError({
    name: 'AuthProviderPayloadError',
    code: errorKeys.auth.providerPayloadMissingClaims,
  })
  if (!payload?.user?.id) throw createCustomError({
    name: 'AuthProviderPayloadError',
    code: errorKeys.auth.providerPayloadMissingUserId,
  })

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
  if (!payload?.providerId) throw createCustomError({
    name: 'AuthSupabaseStateError',
    code: errorKeys.auth.supabaseStateMissingProviderId,
  })
  if (!payload?.userId) throw createCustomError({
    name: 'AuthSupabaseStateError',
    code: errorKeys.auth.supabaseStateMissingUserId,
  })

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
