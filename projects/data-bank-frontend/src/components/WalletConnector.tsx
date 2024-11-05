import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import WalletPopup from "./WalletPopup";

interface WalletConnectorProps {
  isOpen: boolean;
  onClose: () => void;
}

const WalletConnector: React.FC<WalletConnectorProps> = ({ isOpen, onClose }) => {
  const [isWalletPopupOpen, setWalletPopupOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<{
    id: string;
    name: string;
    icon: string;
  } | null>(null);

  const wallets = [
    { id: "pera", name: "Pera", icon: "✱" },
    { id: "defly", name: "Defly", icon: "▲" },
    { id: "daffi", name: "Daffi", icon: "○" },
  ];

  const openWalletPopup = (wallet: { id: string; name: string; icon: string }) => {
    setSelectedWallet(wallet);
    setWalletPopupOpen(true);
  };

  const closeWalletPopup = () => {
    setWalletPopupOpen(false);
    setSelectedWallet(null);
  };

  if (!isOpen) return null;

  return (
    <div className="absolute -right-14 md:-right-8 top-16 w-screen md:w-[448px] bg-[#5e5e5e] bg-opacity-50  backdrop-blur-sm rounded-lg shadow-lg p-6 z-10 transition-all duration-300 ease-in-out">
      <div className="flex justify-end mb-4">
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-200 w-10 h-10 bg-black rounded-lg flex justify-center items-center"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-6">
        {wallets.map((wallet) => (
          <div key={wallet.id} className="rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 bg-black rounded-lg">
                <span className="text-2xl text-white">{wallet.icon}</span>
              </div>
              <span className="text-lg text-white font-medium">{wallet.name}</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <button
                className="px-4 py-2 text-sm bg-[#F2F4F6] text-black rounded-xl font-medium hover:bg-gray-200 transition duration-200"
                onClick={() => openWalletPopup(wallet)}
              >
                Connect
              </button>
              <button
                className="px-4 py-2 text-sm bg-transparent border border-white text-white rounded-xl font-medium hover:bg-white/10 transition duration-200"
                onClick={() => console.log(`Set ${wallet.name} as active`)}
              >
                Set Active
              </button>
              <button
                className="px-4 py-2 text-sm bg-transparent border border-white text-white rounded-xl font-medium hover:bg-white/10 transition duration-200"
                onClick={() => console.log(`Disconnect from ${wallet.name}`)}
              >
                Disconnect
              </button>
            </div>
          </div>
        ))}
      </div>

      <WalletPopup isOpen={isWalletPopupOpen} onClose={closeWalletPopup} selectedWallet={selectedWallet} />
    </div>
  );
};

export default WalletConnector;
