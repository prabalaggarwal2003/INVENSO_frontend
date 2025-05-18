import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header>
    <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="https://bpitindia.com" class="flex items-center">
                <img src="https://sp-ao.shortpixel.ai/client/to_auto,q_lossy,ret_img,w_198,h_108/https://bpitind.bpitindia.ac.in/wp-content/uploads/2020/08/logo1-1.png" class="mr-3 h-6 sm:h-9" alt="bpit Logo" />
                <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"></span>
            </a>
            
            <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                   <li>
                    INVENSO
                   </li>
                </ul>
            </div>
        </div>
    </nav>
</header>
  )
}

export default Header