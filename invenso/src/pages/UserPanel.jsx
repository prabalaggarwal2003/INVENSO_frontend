import React from 'react'
import { Link } from 'react-router-dom'
import Lottie from 'lottie-react'
import formAnimation from '../lotties/formAnimation.json'

function UserPanel() {

  return (
    <>
    <div className='justify-center flex mt-12'>
      <div class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <svg class="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
      </div>
      <div className='mt-2 ml-2'>
          <Link to='/userprofile'>
            Profile
          </Link>
      </div>
    </div>

      <div>
        <div className='flex flex-row justify-around'>
        <div>
        <h1 className='text-center text-4xl mt-40 ml-20'>
          Welcome to your dashboard!
        </h1>
        </div>
        <div className='w-1/2 -mr-40'>
        <Lottie animationData={formAnimation} />
        </div>
        </div>

        <h2 className='text-center text-2xl -mt-48'>
          View your previous reports here!
        </h2>
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
      </>
  )
}

export default UserPanel