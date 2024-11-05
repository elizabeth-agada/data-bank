import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useWallet } from "@txnlab/use-wallet";

interface WalletConnectorProps {
  isOpen: boolean;
  onClose: () => void;
}

const WalletConnector: React.FC<WalletConnectorProps> = ({ isOpen, onClose }) => {
  const [isWalletPopupOpen, setWalletPopupOpen] = useState(false);
  const { providers, activeAddress } = useWallet();
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
    <>
      <div className="fixed right-4 md:right-40 top-28 w-screen md:w-[448px] bg-[#5e5e5e] bg-opacity-50 backdrop-blur-sm rounded-lg shadow-lg p-6 z-10">
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 w-10 h-10 bg-black rounded-lg flex justify-center items-center"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          {providers?.map((wallet) => (
            <div onClick={() => wallet.connect()} key={wallet.metadata.id} className="rounded-xl p-3 space-y-4">
              <div className="flex p-2 items-center gap-4 cursor-pointer hover:bg-[#6c6b6b] rounded-md">
                <div className="flex items-center justify-center w-10 h-10 bg-black rounded-lg">
                  {/* <span className="text-2xl text-white">{wallet.icon}</span> */}
                  <img src={wallet.metadata.icon} alt={wallet.metadata.name} />
                </div>
                <span className="text-lg text-white font-medium">{wallet.metadata.name}</span>
              </div>

              {/* <div className="grid grid-cols-3 gap-3">
                <button
                  className="px-4 py-2 text-sm bg-[#F2F4F6] text-black rounded-xl font-medium hover:bg-gray-200 transition duration-200"

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
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WalletConnector;
