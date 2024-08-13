import React from 'react'
import Background from '/image/wallpaper.jpg'
import { Link } from 'react-router-dom'

const Main = () => {
  return (
    <div className='w-full h-[100vh] bg-cover bg-no-repeat object-cover overflow-hidden relative' 
    style={{backgroundImage: `url(${Background})`}}>
        <div className='flex flex-col justify-center items-center w-full h-[100vh]'>
            <h1 className='text-white font-poppins lg:text-[40px] text-[23px] lg:px-0 px-8 text-center'>Welcome to the Rayzen7 <span className='text-blue'>Song Forum</span></h1>
            <p className='text-white font-poppins1 lg:text-[24px] text-[18px]'>Enjoy it</p>
            <Link to="/Playlist"><button className='mt-10 px-12 py-2 rounded-3xl text-[22px] bg-blue text-white font-poppins1 cursor-pointer
            transition-all duration-300 hover:scale-90 hover:opacity-70'>Start</button></Link>
        </div>
    </div>
  )
}

export default Main
