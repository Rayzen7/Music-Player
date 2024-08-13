import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../views/Home'
import Playlist from '../views/Playlist'
import Login from '../views/Login'
import Upload from '../components/uploadmain/upload'

const Router = () => {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/Playlist' element={<Playlist/>}/>
                <Route path='/Admin' element={<Login/>}/>
                <Route path='/Upload' element={<Upload/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Router