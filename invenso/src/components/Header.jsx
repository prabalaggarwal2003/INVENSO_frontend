import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header>
    <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="https://bpitindia.com" class="flex items-center">
                <img src="https://sp-ao.shortpixel.ai/client/to_auto,q_lossy,ret_img,w_198,h_108/https://bpitind.bpitindia.ac.in/wp-content/uploads/2020/08/logo1-1.png" class="mr-3 h-6 sm:h-9" alt="bpit Logo" />
                <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">BPIT</span>
            </a>
            <div class="flex items-center lg:order-2">
                <Link to='/signup' class="text-gray-800 text-black focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-l border-4 hover:bg-black hover:text-white text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2  focus:outline-none">Sign Up</Link>
                <Link to='/login' class="text-gray-800 text-black focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-l border-4 hover:bg-black hover:text-white text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2  focus:outline-none">Log in</Link>
            </div>
            <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                    <li>
                        <a href="#" class="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white" aria-current="page">Home</a>
                    </li>
                    <li>
                        <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100   lg:border-0  ">About Us</a>
                    </li>
                    <li>
                        <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100   lg:border-0  ">Team</a>
                    </li>
                    <li>
                        <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100   lg:border-0  ">Contact Us</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>
  )
}

export default Header