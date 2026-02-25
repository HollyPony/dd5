import localEnv from './env.local.js'

const env = {
  GOOGLE_CLIENT_ID: '',
  SUPABASE_PROJECT_URL: '',
  SUPABASE_PUBLIC_KEY: '',
}

export default {
  ...env,
  ...localEnv
}
