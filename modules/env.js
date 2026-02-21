import localEnv from './env.local.js'

const env = {
  GOOGLE_CLIENT_ID: ''
}

export default {
  ...env,
  ...localEnv
}
