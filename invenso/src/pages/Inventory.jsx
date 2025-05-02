import React from 'react'
import {Link} from "react-router-dom"

function Inventory() {
  return (
    <div>
        <h1 className='text-center text-3xl mt-16'>
            Create asset wise Inventory here!
        </h1>
        <h2 className='text-center text-xl'>
            Fill the asset specific form and add it to your Inventory!
        </h2>
        <br />
        <div>
            <h1 className='text-xl ml-12'>
                <p>
                    <Link to="/addrooms"> 1. Add Rooms </Link><br />
                    <Link to="/addtype"> 2. Add Equipment Types</Link> <br />
                    <Link to="/addequipment"> 3. Add Equipment </Link><br />
                </p>
            </h1>
            <br />
        </div>
        <br />
    </div>
  )
}

export default Inventory