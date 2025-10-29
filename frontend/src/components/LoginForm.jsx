
import React, {useState} from 'react'
import { supabase } from '../supabaseClient'

export default function LoginForm(){
  const [email,setEmail]=useState(''),[password,setPassword]=useState(''),[msg,setMsg]=useState('')
  async function signUp(){ setMsg(''); const { error } = await supabase.auth.signUp({ email, password }); if(error) setMsg(error.message); else setMsg('Verifique seu email para confirmar (se aplicável).') }
  async function signIn(){ setMsg(''); const { error } = await supabase.auth.signInWithPassword({ email, password }); if(error) setMsg(error.message) }
  return (<div><h2>Login / Cadastro</h2><input placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} /><input placeholder='Senha' type='password' value={password} onChange={e=>setPassword(e.target.value)} /><div style={{marginTop:8}}><button onClick={signIn}>Entrar</button><button onClick={signUp} style={{marginLeft:8}}>Criar conta</button></div><p>{msg}</p></div>)
}
