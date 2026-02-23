import { addScript } from '../domlib.js'
import env from '../env.js'

const providerId = 'google'
const GOOGLE_GSI_SCRIPT_SRC = 'https://accounts.google.com/gsi/client'
const listeners = new Set()

let initialized = false

function isConfigured() {
  return Boolean(env.GOOGLE_CLIENT_ID)
}

/**
 * Decode a JWT payload (middle segment) without signature validation.
 * @param {string} idToken
 * @returns {Record<string, any>}
 */
function decodeJwtPayload(idToken) {
  const [header, payload, signature] = idToken.split('.')
  if (!header || !payload || !signature) throw new Error('Invalid JWT format.')

  const base64Payload = payload.replace(/-/g, '+').replace(/_/g, '/')
  const padLength = (4 - (base64Payload.length % 4)) % 4
  const padded = base64Payload + '='.repeat(padLength)
  return JSON.parse(atob(padded))
}

/**
 * @param {{ credential: string }} response
 */
function handleCredentialResponse(response) {
  if (!response?.credential) throw new Error('Google credential response is missing `credential`.')


  const claims = decodeJwtPayload(response.credential)
  if (!claims?.sub) throw new Error('Google ID token payload is missing `sub`.')

  const payload = {
    providerId,
    idToken: response.credential,
    claims,
    user: {
      id: claims.sub,
      displayName: claims.name ?? '',
      email: claims.email ?? '',
      picture: claims.picture ?? '',
    },
  }

  for (const callback of listeners) callback(payload)
}

/**
 * Initializes Google Identity Services.
 * @returns {Promise<boolean>}
 */
async function init() {
  if (!isConfigured()) return
  if (initialized) return

  await addScript(GOOGLE_GSI_SCRIPT_SRC)
  if (!window.google?.accounts?.id) throw new Error('Google Identity Services API is unavailable.')

  window.google.accounts.id.initialize({
    client_id: env.GOOGLE_CLIENT_ID,
    callback: handleCredentialResponse,
    color_scheme: 'dark',
  })

  initialized = true
}

/**
 * Prompt Google Sign-In via GIS/FedCM.
 * @returns {Promise<void>}
 */
async function prompt() {
  if (!isConfigured()) throw new Error('Google authentication provider is not configured.')
  await init()
  if (!window.google?.accounts?.id) throw new Error('Google Identity Services API is unavailable.')

  window.google.accounts.id.prompt()
}

/**
 * Clears GIS auto-select state.
 * @returns {Promise<void>}
 */
async function signOut() {
  if (!isConfigured()) return
  await init()
  if (!window.google?.accounts?.id) throw new Error('Google Identity Services API is unavailable.')

  window.google.accounts.id.disableAutoSelect()
}

/**
 * Subscribe to normalized Google authenticated payloads.
 * @param {(payload: { providerId: 'google', idToken: string, claims: Record<string, any>, user: { id: string, displayName: string, email: string, picture: string } }) => void} callback
 * @returns {() => boolean}
 */
function onCredential(callback) {
  listeners.add(callback)
  return () => listeners.delete(callback)
}

export default {
  providerId,
  isConfigured,
  init,
  signInInteractive: prompt,
  signOut,
  onCredential,
}
