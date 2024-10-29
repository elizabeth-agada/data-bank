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
    <div className="">
      <Navbar />

      <section className="text-center text-white min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold mb-4 max-w-4xl">
          Secure Your <span className="text-[#2B9DDA]">Documents</span> with
          <span className="text-[#2B9DDA]"> Blockchain</span> Technology
        </h1>
        <p className="mb-8 text-lg max-w-xl mx-auto">
          Our platform offers decentralized, private, and immutable document
          storage, ensuring your data is safe and fully under your control.
        </p>
        <div className="flex gap-4">
          <button className="bg-[#FFFFFF] border-1 px-5 py-3 rounded-2xl text-black font-semibold">
            Get Started
          </button>
          <button className="border-1 px-5 py-3 border-[#2B9DDA] rounded-2xl text-[#2B9DDA] font-semibold hover:bg-[#2B9DDA]">
            Learn More
          </button>
        </div>
      </section>

      <ConnectWallet openModal={openWalletModal} closeModal={toggleWalletModal} />
    </div>
  )
}

export default Home
