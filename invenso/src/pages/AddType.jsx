import React from 'react'
import EquipmentType from '../components/EquipmentType'

function AddType() {
  return (
    <div className='p-6'>
      <h1 className='text-3xl text-center mt-16 font-[1000]'>
        Add Types of Equipment
      </h1>
      <br />
      <EquipmentType/>
    </div>
  )
}

export default AddType