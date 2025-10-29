
import React, {useState} from 'react'

export default function UploadMusic({ user }){
  const [file,setFile]=useState(null),[title,setTitle]=useState(''),[artist,setArtist]=useState(''),[genre,setGenre]=useState(''),[loading,setLoading]=useState(false)
  async function upload(){
    if(!file) return alert('Escolha um arquivo')
    setLoading(true)
    try{
      const form = new FormData()
      form.append('file', file)
      form.append('title', title)
      form.append('artist', artist)
      form.append('genre', genre)
      form.append('user_id', user.id)
      const res = await fetch('/api/upload', { method:'POST', body: form })
      if(!res.ok) throw new Error(await res.text())
      setFile(null); setTitle(''); setArtist(''); setGenre('')
      alert('Upload concluído')
      window.location.reload()
    }catch(e){ console.error(e); alert('Erro: '+e.message) }finally{ setLoading(false) }
  }
  return (<div style={{border:'1px solid #eee', padding:12, marginTop:12}}><h3>Upload</h3><input type='file' accept='audio/*' onChange={e=>setFile(e.target.files?.[0])} /><input placeholder='Título' value={title} onChange={e=>setTitle(e.target.value)} /><input placeholder='Artista' value={artist} onChange={e=>setArtist(e.target.value)} /><input placeholder='Gênero' value={genre} onChange={e=>setGenre(e.target.value)} /><div style={{marginTop:8}}><button onClick={upload} disabled={loading}>{loading?'Enviando...':'Enviar'}</button></div></div>)
}
