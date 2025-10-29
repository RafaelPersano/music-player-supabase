
import React, {useEffect, useRef, useState} from 'react'
export default function MusicPlayer(){
  const audioRef = useRef(null); const [track,setTrack]=useState(null); const [playing,setPlaying]=useState(false)
  useEffect(()=>{
    function onPlay(e){ setTrack(e.detail); setPlaying(true); audioRef.current.src = e.detail.public_url; audioRef.current.play() }
    window.addEventListener('play', onPlay)
    return ()=> window.removeEventListener('play', onPlay)
  },[])
  return (<div style={{position:'fixed',left:16,right:16,bottom:16,background:'#fff',border:'1px solid #ddd',padding:12}}><div style={{display:'flex',alignItems:'center',gap:12}}><div><strong>{track?.title || '(nenhuma)'}</strong><br/><small>{track?.artist}</small></div><div><button onClick={()=>{ if(!audioRef.current) return; if(playing){ audioRef.current.pause(); setPlaying(false)} else { audioRef.current.play(); setPlaying(true) } }}>{playing?'Pause':'Play'}</button></div><audio ref={audioRef} /></div></div>)
}
