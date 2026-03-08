import { fromJSONEntry, toJSONEntry } from './charSheet.storage.helpers.js'
import authService from '../auth/auth.service.js'
import { createCustomError, errorKeys } from '../errors.js'

const TABLE_NAME = 'character_sheets'

async function withUserTable(callback) {
  const userId = authService.supabaseUserId
  if (!userId) throw createCustomError({
    name: 'CloudAuthError',
    code: errorKeys.storage.cloudAuthMissingUserId,
  })

  const table = authService.getSupabaseClient().from(TABLE_NAME)
  return callback({ table, userId })
}

async function load(id) {
  return withUserTable(async ({ table, userId }) => {
    const { data: row, error } = await table
      .select('id, payload, version, updated_at')
      .eq('id', id)
      .eq('user_id', userId)
      .maybeSingle()

    if (error) throw error
    if (!row) return null
    return fromJSONEntry(JSON.stringify({
      id: row.id,
      updatedAt: Date.parse(row.updated_at),
      version: row.version,
      data: row.payload,
    }))
  })
}

async function listIds() {
  return withUserTable(async ({ table, userId }) => {
    const { data, error } = await table
      .select('id')
      .eq('user_id', userId)

    if (error) throw error
    return data.map(item => item.id)
  })
}

async function save(entry) {
  return withUserTable(async ({ table, userId }) => {
    if (!entry?.id) throw createCustomError({
      name: 'CloudEntryValidationError',
      code: errorKeys.storage.cloudEntryMissingId,
    })
    if (!Number.isFinite(entry?.updatedAt)) throw createCustomError({
      name: 'CloudEntryValidationError',
      code: errorKeys.storage.cloudEntryMissingUpdatedAt,
    })
    if (!entry?.data) throw createCustomError({
      name: 'CloudEntryValidationError',
      code: errorKeys.storage.cloudEntryMissingData,
    })
    if (!userId) throw createCustomError({
      name: 'CloudEntryValidationError',
      code: errorKeys.storage.cloudEntryMissingUserId,
    })

    const payload = JSON.parse(toJSONEntry({ data: entry.data })).data
    const row = {
      id: entry.id,
      user_id: userId,
      payload,
      version: entry.version ?? 1,
      updated_at: new Date(entry.updatedAt).toISOString(),
    }
    const { error } = await table.upsert(row, { onConflict: 'user_id,id' })
    if (error) throw error
    return row.id
  })
}

async function remove(id) {
  return withUserTable(async ({ table, userId }) => {
    const { error } = await table
      .delete()
      .eq('id', id)
      .eq('user_id', userId)

    if (error) throw error
  })
}

export default {
  listIds,
  load,
  save,
  remove,
}
