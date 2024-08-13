import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <div className='flex w-full h-[10vh] justify-between lg:px-20 px-5 items-center fixed z-50 bg-Navbar'>
            <h1 className='text-[22px] font-poppins text-white'>Ray<span className='text-blue'>Song</span></h1>
            <div className='space-x-6'>
                <button className='bg-blue text-white px-3 py-2 rounded-3xl font-poppins1 text-[11px] cursor-pointer'>About Me?</button>
                <Link to="/Admin"><button className='bg-blue text-white px-3 py-2 rounded-3xl font-poppins1 text-[11px] cursor-pointer'>Admin</button></Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar