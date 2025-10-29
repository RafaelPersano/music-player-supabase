
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { title, artist, genre, excerpt } = req.body || {}
  if (!title) return res.status(400).json({ error: 'title required' })

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY
  if (!OPENAI_API_KEY) return res.status(500).json({ error: 'OpenAI key not configured' })

  const prompt = `You are a helpful assistant that extracts up to 6 short genre/style tags and a one-sentence description for a music track.
Return JSON only with keys: "tags" (array of strings), "description" (string).
Input:
title: "${title}"
artist: "${artist||''}"
genre: "${genre||''}"
excerpt: "${(excerpt||'').replace(/\n/g,' ')}"
`;

  try {
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: process.env.OPENAI_MODEL || 'gpt-4o-mini', messages: [{ role: 'user', content: prompt }], max_tokens: 200, temperature: 0.2 })
    })
    if (!resp.ok) return res.status(resp.status).send(await resp.text())
    const data = await resp.json()
    let content = data?.choices?.[0]?.message?.content ?? ''
    const firstBrace = content.indexOf('{'); const lastBrace = content.lastIndexOf('}')
    if (firstBrace !== -1 && lastBrace !== -1) content = content.slice(firstBrace, lastBrace+1)
    try { return res.status(200).json(JSON.parse(content)) } catch(e) { return res.status(200).json({ raw: content }) }
  } catch (err) { console.error(err); return res.status(500).json({ error: String(err) }) }
}
