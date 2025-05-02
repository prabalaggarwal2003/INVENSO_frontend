import React from 'react'
import { Link } from 'react-router-dom'
import Lottie from 'lottie-react'
import homeAnimation from '../lotties/homeAnimation.json'

function Home() {
  return (
    <div>
    <section  className="main1">
    <img src="https://images.shiksha.com/mediadata/images/1512469113phpxVkQNz.png" alt="" className='w-full brightness-50 h-[34rem]'/>
    <div className='absolute top-1/3 left-1/4 -translate-1/2 1/2'>
    <h1 className='text-center text-6xl mt-16 text-white'>
            Welcome to INVENSO
        </h1>
        <p className='text-justify text-2xl mt-4 text-white'>
            This is BPIT's official ASSET MANAGEMENT SYSTEM
            </p>
            </div>
    </section>
        
<br />

<div>
  <Lottie animationData ={homeAnimation} className='w-1/4 h-[20rem]'/>
</div>
        <p className='text-center text-xl mt-4'>
            <Link to='/adminpanel'>ADMIN DASHBOARD</Link>
            <br />
            <Link to='/userpanel'>USER DASHBOARD</Link>
        </p>
<br />
    
        
        
        
    </div>
  )
}

export default Home