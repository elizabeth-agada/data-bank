import React from 'react'
import { useWallet } from '@txnlab/use-wallet'
import { useNavigate } from 'react-router-dom'
import { User2, Hand } from 'lucide-react';

export default function DashboardNav() {
  const { providers, activeAddress } = useWallet();
  const navigate = useNavigate();

  function shortenAddress(address: string | any[]) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  const disconnectWallet = () => {
    providers?.forEach((wallet) => wallet.disconnect());
  }


  const handleWalletClick = () => {
    if (activeAddress) {

      disconnectWallet();
      navigate("/");

    }
  };

  return (
    <div className="flex items-center justify-between mb-3">
      <h1 className="text-2xl font-semibold">
        Welcome <span className="text-[#2B9DDA]">!!</span>
      </h1>
      <button
        onClick={handleWalletClick}
        className="flex items-center justify-center gap-2 bg-white text-black p-2 md:px-4 md:py-2 rounded-lg text-sm font-mono"
        title='click me to logout'>
        <User2 size={16} />
          {activeAddress && shortenAddress(activeAddress)}
      </button>
    </div>
  )
}
