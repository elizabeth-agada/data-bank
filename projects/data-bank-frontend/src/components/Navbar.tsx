import React from 'react'

export default function Navbar() {
  return (
    <>
      <div className="grid grid-cols-12 max-w-7xl mx-auto items-center border-1 border-teal-800 mt-5 text-white">
        <div className="col-span-4">
          <img src="/img/logo.png" alt="" className="" />
        </div>
        <div className="col-span-4">
          <ul className="flex justify-between">
            <li>
              <a href="#" className="hover:text-teal-300">Home</a>
            </li>
            <li>
              <a href="/how" className="hover:text-teal-300">How Does It Work</a>
            </li>
            <li>
              <a href="#" className="hover:text-teal-300">About Us</a>
            </li>
          </ul>
        </div>
        <div className="col-span-4">
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

