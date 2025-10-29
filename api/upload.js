
import { createClient } from '@supabase/supabase-js'
import formidable from 'formidable'
import fs from 'fs'

export const config = { api: { bodyParser: false } }

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed')
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !supabaseKey) return res.status(500).json({ error: 'Supabase keys not set' })
  const supabase = createClient(supabaseUrl, supabaseKey)
  const form = new formidable.IncomingForm()
  form.parse(req, async (err, fields, files) => {
    try {
      if (err) return res.status(400).json({ error: err.message })
      const file = files.file
      if (!file) return res.status(400).json({ error: 'file required' })
      const buffer = await fs.promises.readFile(file.filepath)
      const title = fields.title || file.originalFilename
      const artist = fields.artist || ''
      const genre = fields.genre || ''
      const user_id = fields.user_id || null
      const bucket = process.env.VITE_SUPABASE_STORAGE_BUCKET || 'music'
      const path = `${Date.now()}_${file.originalFilename}`
      const { data: upData, error: upErr } = await supabase.storage.from(bucket).upload(path, buffer)
      if (upErr) return res.status(500).json({ error: upErr.message })
      const publicUrl = supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl
      const insert = await supabase.from('tracks').insert([{ user_id, title, artist, genre, file_path: path, public_url: publicUrl }]).select().single()
      return res.status(200).json(insert.data)
    } catch (e) {
      console.error(e); return res.status(500).json({ error: String(e) })
    }
  })
}
