import createEventBus from '../createEventBus.js'
import createStore from '../createStore.js'

export const AUTH_STATUS = {
  anonymous: 'anonymous',
  authenticated: 'authenticated',
}

const store = createStore(createAnonymousState(), createEventBus())

function createAnonymousState() {
  return {
    status: AUTH_STATUS.anonymous,
    providerId: null,
    idToken: null,
    claims: null,
    user: null,
  }
}

/**
 * @param {{ providerId: string, idToken: string, claims: Record<string, any>, user: { id: string, displayName: string, email: string, picture: string } }} payload
 * @returns {void}
 */
function setAuthenticated(payload) {
  if (!payload?.providerId) throw new Error('Authenticated payload is missing providerId.')
  if (!payload?.idToken) throw new Error('Authenticated payload is missing idToken.')
  if (!payload?.claims) throw new Error('Authenticated payload is missing claims.')
  if (!payload?.user?.id) throw new Error('Authenticated payload is missing user.id.')

  store.set({
    status: AUTH_STATUS.authenticated,
    providerId: payload.providerId,
    idToken: payload.idToken,
    claims: payload.claims,
    user: payload.user,
  })
}

/**
 * @returns {void}
 */
function reset() {
  store.set(createAnonymousState())
}

export default {
  getState: store.get,
  setAuthenticated,
  reset,
  on: store.on,
  onAny: store.onAny,
}
