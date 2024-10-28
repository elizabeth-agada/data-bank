import React from 'react'

export default function Navbar() {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="">
          <img src="/img/logo.png" alt="" className="" />
        </div>
        <div className="">
          <ul className="flex justify-between">
            <li>
              <a href="#" className="hover:text-teal-300">Home</a>
            </li>
            <li>
              <a href="#" className="hover:text-teal-300">How Does It Work</a>
            </li>
            <li>
              <a href="#" className="hover:text-teal-300">About Us</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
        <button
          className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200"
          >
          Connect Wallet
        </button>
      </div>
    </div>
</>
  )
}

