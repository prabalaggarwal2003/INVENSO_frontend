import React from 'react'
import {Link} from "react-router-dom"

function Inventory() {
  return (
    <div className='p-6'>
        <h1 className='text-center text-3xl mt-16 font-[1000]'>
            Create asset wise Inventory here!
        </h1>
        <h2 className='text-center text-2xl mt-4'>
            Fill the asset specific form and add it to your Inventory!
        </h2>
        <br />
        
            <div className='flex flex-row justify-center mt-12'>
                
                    <Link to="/addrooms">
                    <button className='text-lg cursor-pointer bg-blue-500 text-white px-4 py-2 rounded mx-4'>
                        Add Rooms
                    </button>
                    </Link>
                    <Link to="/addtype">
                    <button className='text-lg cursor-pointer bg-blue-500 text-white px-4 py-2 rounded mx-4'>
                        Add Types of Equipment
                    </button>
                    </Link>
                    <Link to="/addequipment">
                    <button className='text-lg cursor-pointer bg-blue-500 text-white px-4 py-2 rounded mx-4'>
                        Add Equipment
                    </button>
                    </Link>
                
            </div>
            <br />
        
        <br />
    </div>
  )
}

export default Inventory