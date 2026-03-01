import { addScript } from '../domlib.js'
import env from '../env.js'
import { createCustomError, errorKeys } from '../errors.js'

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
  if (!header || !payload || !signature) throw createCustomError({ name: 'GoogleJwtError', code: errorKeys.auth.googleInvalidJwtFormat })

  const base64Payload = payload.replace(/-/g, '+').replace(/_/g, '/')
  const padLength = (4 - (base64Payload.length % 4)) % 4
  const padded = base64Payload + '='.repeat(padLength)
  return JSON.parse(atob(padded))
}

function assertGoogleApiAvailable() {
  if (!window.google?.accounts?.id) throw createCustomError({ name: 'GoogleApiUnavailableError', code: errorKeys.auth.googleApiUnavailable })
}

/**
 * Initializes Google Identity Services.
 * @returns {Promise<void>}
 */
async function init({
  rememberMe = true
} = {}) {
  if (!isConfigured()) return

  if (!initialized) {
    await addScript(GOOGLE_GSI_SCRIPT_SRC)
    assertGoogleApiAvailable()
    initialized = true
  }

  assertGoogleApiAvailable()

  window.google.accounts.id.initialize({
    client_id: env.GOOGLE_CLIENT_ID,
    callback: function handleCredentialResponse(response) {
      if (!response?.credential) throw createCustomError({ name: 'GoogleCredentialError', code: errorKeys.auth.googleCredentialMissing })

      const claims = decodeJwtPayload(response.credential)
      if (!claims?.sub) throw createCustomError({ name: 'GoogleTokenPayloadError', code: errorKeys.auth.googleTokenMissingSub })

      const payload = {
        providerId,
        rememberMe,
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
    },
    color_scheme: 'dark',
    auto_select: rememberMe,
  })
}

/**
 * Attempt provider session restoration without displaying One Tap UI.
 * @returns {Promise<void>}
 */
async function restoreSession() {
  if (!isConfigured()) return

  await init({
    rememberMe: true
  })

  window.google.accounts.id.prompt((notification) => {
    if (notification.isDisplayed()) {
      window.google.accounts.id.cancel()
    }
  })
}

/**
 * Prompt Google Sign-In via GIS/FedCM.
 * @param {{ rememberMe?: boolean }} [options]
 * @returns {Promise<void>}
 */
async function prompt(options = {
  rememberMe: true
}) {
  await init({
    rememberMe: options.rememberMe,
  })
  assertGoogleApiAvailable()

  window.google.accounts.id.prompt()
}

/**
 * Clears GIS auto-select state for an explicit user sign-out.
 * @returns {Promise<void>}
 */
async function signOut() {
  if (!isConfigured()) return
  if (!initialized) return

  assertGoogleApiAvailable()
  window.google.accounts.id.disableAutoSelect()
}

/**
 * Subscribe to normalized Google authenticated payloads.
 * @param {(payload: { providerId: 'google', rememberMe: boolean, idToken: string, claims: Record<string, any>, user: { id: string, displayName: string, email: string, picture: string } }) => void} callback
 * @returns {() => boolean}
 */
function onCredential(callback) {
  listeners.add(callback)
  return () => listeners.delete(callback)
}

export default {
  providerId,
  isConfigured,
  restoreSession,
  signInInteractive: prompt,
  signOut,
  onCredential,
}
