import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useWallet } from "@txnlab/use-wallet";

interface WalletConnectorProps {
  isOpen: boolean;
  onClose: () => void;
}

const WalletConnector: React.FC<WalletConnectorProps> = ({ isOpen, onClose }) => {
  const { providers, activeAddress } = useWallet();

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed right-1 lg:right-11 xl:right-48 top-28 w-screen md:w-[448px] bg-[#5e5e5e] bg-opacity-50 backdrop-blur-sm rounded-lg shadow-lg p-6 z-10">
        <div className="flex justify-end mb-4">
          <button onClick={onClose} className="text-black hover:bg-gray w-10 h-10 bg-white rounded-lg flex justify-center items-center">
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-6">
          {providers?.map((wallet) => (
            <div onClick={() => wallet.connect()} key={wallet.metadata.id} className="rounded-xl p-3 space-y-4">
              <div className="flex p-2 items-center gap-4 cursor-pointer hover:bg-[#6c6b6b] rounded-md">
                <div className="flex items-center justify-center w-10 h-10 bg-black rounded-lg">
                  <img src={wallet.metadata.icon} alt={wallet.metadata.name} />
                </div>
                <span className="text-lg text-white font-medium">{wallet.metadata.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WalletConnector;
