import env from './env.js'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const projectUrl = env.SUPABASE_PROJECT_URL
const publicKey = env.SUPABASE_PUBLIC_KEY

export default (projectUrl && publicKey)
  ? createClient(projectUrl, publicKey)
  : null
