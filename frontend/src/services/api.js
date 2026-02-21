import axios from 'axios'

const SUPABASE_URL = 'https://tirwtxxtxfsghitkfxxb.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpcnd0eHh0eGZzZ2hpdGtmeHhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4NzM1MTEsImV4cCI6MjA4NDQ0OTUxMX0.DChPG6mj8H9sPcGJ9UbFhkDqHgLVkpkPOmYsEFDf05Q'

// Supabase REST API direct connection
const supabase = axios.create({
  baseURL: `${SUPABASE_URL}/rest/v1`,
  headers: {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
    Prefer: 'return=representation',
  },
})

// GET all guestbook entries
export const getEntries = () =>
  supabase.get('/guestbook_finals', {
    params: { select: '*', order: 'created_at.desc' }
  })

// POST a new guestbook entry
export const createEntry = (data) =>
  supabase.post('/guestbook_finals', {
    name: data.name,
    message: data.message,
  })

export default supabase
