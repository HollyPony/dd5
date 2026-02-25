import supabaseClient from '../supabase.client.js'
import authCloudService from '../auth/auth.cloud.service.js'
import { fromJSONEntry, toJSONEntry } from './charSheet.storage.helpers.js'

const TABLE_NAME = 'character_sheets'

function mapCloudRowToEntry(row) {
  return fromJSONEntry(JSON.stringify({
    id: row.id,
    updatedAt: Date.parse(row.updated_at),
    version: row.version,
    data: row.payload,
  }))
}

function mapEntryToCloudRow(entry, userId) {
  if (!entry?.id) throw new Error('Cloud save entry is missing id.')
  if (!Number.isFinite(entry?.updatedAt)) throw new Error('Cloud save entry is missing updatedAt.')
  if (!entry?.data) throw new Error('Cloud save entry is missing data.')
  if (!userId) throw new Error('Cloud save entry is missing user id.')

  const payload = JSON.parse(toJSONEntry({ data: entry.data })).data

  return {
    id: entry.id,
    user_id: userId,
    payload,
    version: entry.version ?? 1,
    updated_at: new Date(entry.updatedAt).toISOString(),
  }
}

async function withUserTable(callback) {
  const userId = authCloudService.userId
  if (!userId) throw new Error('Cloud auth is missing user id.')

  const table = supabaseClient.from(TABLE_NAME)
  return callback({ table, userId })
}

async function load(id) {
  return withUserTable(async ({ table, userId }) => {
    const { data, error } = await table
      .select('id, payload, version, updated_at')
      .eq('id', id)
      .eq('user_id', userId)
      .maybeSingle()

    if (error) throw error
    if (!data) return null
    return mapCloudRowToEntry(data)
  })
}

async function save(entry) {
  return withUserTable(async ({ table, userId }) => {
    const row = mapEntryToCloudRow(entry, userId)
    const { error } = await table.upsert(row, { onConflict: 'id' })
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
  load,
  save,
  remove,
}
