import React from 'react'
import {Link} from 'react-router-dom'

function Footer() {
  return (
  
<footer className="bg-white rounded-lg shadow-sm m-2 dark:bg-gray-800">
    <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 <Link to="/" className="hover:underline">INVENSO</Link>. All Rights Reserved.
    </span>
    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
       
    </ul>
    </div>
</footer>

  )
}

export default Footer