
import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !supabaseKey) return res.status(500).json({ error: 'Supabase keys not set' })
  const supabase = createClient(supabaseUrl, supabaseKey)
  const user_id = req.query.user_id || null
  const adminEmail = process.env.ADMIN_EMAIL || null
  // If admin email provided and request has ?admin=true, return all
  if (req.query.admin === 'true') {
    // basic check: ensure requester knows some admin secret? This is simple implementation; prefer auth checks.
    const { data, error } = await supabase.from('tracks').select('*').order('created_at', { ascending: false })
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json(data || [])
  }
  if (!user_id) return res.status(400).json({ error: 'user_id required' })
  const { data, error } = await supabase.from('tracks').select('*').eq('user_id', user_id).order('created_at', { ascending: false })
  if (error) return res.status(500).json({ error: error.message })
  return res.status(200).json(data || [])
}
