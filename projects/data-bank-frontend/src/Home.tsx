// src/components/Home.tsx
import React, { useState } from 'react'
import { useWallet } from '@txnlab/use-wallet'
import ConnectWallet from './components/ConnectWallet'
import Navbar from './components/Navbar'

const Home: React.FC = () => {
  const [openWalletModal, setOpenWalletModal] = useState<boolean>(false)
  const { activeAddress } = useWallet()

  const toggleWalletModal = () => {
    setOpenWalletModal(!openWalletModal)
  }

  return (
    <div className="min-h-screen text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-dark-header border-1 border-teal-800">
        <Navbar />
      </header>

      <section className="">
        <h1 className="text-4xl font-bold mb-4">
          Secure Your <span className="text-teal-300">Documents</span> with
          <span className="text-teal-300"> Blockchain</span> Technology
        </h1>
        <p className="mb-8 text-lg">
          Our platform offers decentralized, private, and immutable document
          storage, ensuring your data is safe and fully under your control.
        </p>
        <div className="flex gap-4">
          <button className="bg-[#FFFFFF] p-5 font-semibold hover:bg-gray-200">
            Get Started
          </button>
          <button className="btn border-1 border-teal-800 font-semibold hover:bg-teal-300">
            Learn More
          </button>
        </div>
      </section>

      <ConnectWallet openModal={openWalletModal} closeModal={toggleWalletModal} />
    </div>
  )
}

export default Home
