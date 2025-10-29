
import React, {useEffect, useState} from 'react'
import { supabase } from './supabaseClient'
import LoginForm from './components/LoginForm'
import UploadMusic from './components/UploadMusic'
import MusicList from './components/MusicList'
import MusicPlayer from './components/MusicPlayer'

export default function App(){
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  useEffect(()=>{
    supabase.auth.getSession().then(r=>{ setSession(r.data.session); setUser(r.data.session?.user) })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session); setUser(session?.user || null)
    })
    return ()=> listener?.subscription?.unsubscribe()
  },[])

  async function signOut(){ await supabase.auth.signOut() }

  if(!user) return <div className="container"><h1>Music Player SaaS</h1><LoginForm/></div>

  return (
    <div className="container">
      <div className="nav"><strong>Olá, {user.email}</strong><div style={{flex:1}}></div><button onClick={signOut}>Sair</button></div>
      <h2>Seus áudios</h2>
      <UploadMusic user={user} />
      <MusicList user={user} />
      <MusicPlayer />
    </div>
  )
}
