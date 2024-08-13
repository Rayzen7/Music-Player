import React from 'react'
import SongPlaylist from '../components/playlist/SongPlaylist'
import Navbar from '../components/Navbar'

const Playlist = () => {
  return (
    <div>
        <div className='z-20 relative'>
            <Navbar/>
        </div>
        <SongPlaylist/>
    </div>
  )
}

export default Playlist