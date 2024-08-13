import React from 'react'
import Main from '../components/home/MainHome'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <div>
        <div className='relative z-20'>
            <Navbar/>
        </div>
        <Main/>
    </div>
  )
}

export default Home