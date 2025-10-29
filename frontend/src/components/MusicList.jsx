
import React, {useEffect, useState} from 'react'
export default function MusicList({ user }){
  const [tracks,setTracks]=useState([])
  useEffect(()=>{ load() },[])
  async function load(){
    const res = await fetch('/api/listTracks?user_id='+encodeURIComponent(user.id))
    const data = await res.json()
    setTracks(data || [])
  }
  return (<div style={{marginTop:12}}><h3>Lista</h3><table><thead><tr><th>Título</th><th>Artista</th><th>Gênero</th><th>Data</th><th>Ações</th></tr></thead><tbody>{(tracks||[]).map(t=>(<tr key={t.id}><td>{t.title}</td><td>{t.artist}</td><td>{t.genre}</td><td>{new Date(t.created_at).toLocaleString()}</td><td><button onClick={()=>{ const ev = new CustomEvent('play', {detail:t}); window.dispatchEvent(ev) }}>Play</button></td></tr>))}</tbody></table></div>)
}
