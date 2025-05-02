import React from 'react'
import { Link } from 'react-router-dom'

function AdminPanel() {
  return (
    <div>
      <h1 className='text-3xl text-center mt-16'>
        Welcome to Admin Dashboard
      </h1>
      <h2 className='text-2xl text-center mt-4'>
        View all your reports here and create asset wise inventory
      </h2>
      <br />
      <br />
      <div className='flex ml-16 text-2xl'>
        <Link to='/inventory'>
              <button className='cursor-pointer'>
                  Create and Manage your Inventory
              </button>
          </Link>
      </div>
      <br />
      <br />
      <div>

        <h1 className='text-2xl text-center'>
          View all previous reports below:
        </h1>
<br />
        <div className='flex justify-center'>
        <table className='border-2 table-auto border-collapse'>
          <thead>
            <tr>
              <th className='px-4 border-2 border-black-200'>
                col1
              </th>
              <th className='px-4 border-2 border-black-200'>
                col2
              </th>
              <th className='px-4 border-2 border-black-200'>
                col3
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='px-4 border-2 border-black-200'>
                entry1
              </td>
              <td className='px-4 border-2 border-black-200'>
                entry2
              </td>
              <td className='px-4 border-2 border-black-200'>
                entry3
              </td>
            </tr>
          </tbody>
        </table>
        </div>
        
      </div>
        
    </div>
  )
}

export default AdminPanel