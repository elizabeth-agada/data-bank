import React, { useEffect, useState } from "react";
import { XMarkIcon, ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import WalletConnect from "@walletconnect/client";

interface Wallet {
  id: string;
  name: string;
}

interface PeraWalletPopupProps {
  isOpen: boolean;
  onClose: () => void;
  selectedWallet: Wallet | null;
}

export default function PeraWalletPopup({ isOpen, onClose, selectedWallet }: PeraWalletPopupProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(true);
  const [isWebOpen, setIsWebOpen] = useState(false);
  const [connector, setConnector] = useState<WalletConnect | null>(null);
  const [uri, setUri] = useState<string | null>(null);

  useEffect(() => {
    const newConnector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org",
    });

    if (newConnector.connected) {
      setUri(newConnector.uri);
    } else {
      newConnector.createSession().then(() => {
        setUri(newConnector.uri);
      });
    }

    setConnector(newConnector);
    newConnector.on("connect", (error, payload) => {
      if (error) throw error;
      console.log("Connected!", payload);
    });

    newConnector.on("disconnect", (error) => {
      if (error) throw error;
      console.log("Disconnected");
    });

    return () => {
      if (newConnector) {
        newConnector.killSession();
      }
    };
  }, []);

  const handleConnectWeb = () => {
    if (connector) {
      if (selectedWallet) {
        console.log(`Connecting to ${selectedWallet.name} web interface`);
      }
    }
  };

  if (!isOpen || !selectedWallet) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 text-[#3C3C49]">
      <div className="bg-[#F2F4F6] w-full h-full max-w-lg p-0 flex flex-col rounded-2xl">
        <div className="">
          <div className="flex justify-between items-center p-4">
            <img src="./img/pera.png" alt="Wallet Logo" className="h-8" />
            <button onClick={onClose} className="text-gray-400 hover:text-gray-200 rounded-lg flex justify-center items-center">
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
          <h2 className="text-lg mb-4 px-5 w-[267] h-24">Simply the best Algorand wallet</h2>
        </div>
        <div className="flex flex-col flex-grow space-y-4 p-4">
          {/* Connect with Mobile Section */}
          <div className="w-full py-3 px-3 bg-white rounded-2xl h-auto flex flex-col">
            <div className="flex items-center cursor-pointer" onClick={() => setIsMobileOpen(!isMobileOpen)}>
              {isMobileOpen ? <ChevronDownIcon className="h-5 w-5" /> : <ChevronRightIcon className="h-5 w-5" />}
              <span>
                Connect with<span className="font-bold px-3">{selectedWallet.name} Mobile</span>
              </span>
            </div>
            {isMobileOpen && (
              <div className="flex flex-col items-center space-y-2 mt-3">
                {uri && <img src="./img/pera-qr.png" alt="" className="" />}
                <span>Don't have {selectedWallet.name} wallet app?</span>
                <div className="flex">
                  <img src="./img/Category.png" alt="" className="items-center h-5 w-5" />
                  <a
                    href="https://perawallet.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#6B0DFA] h-[18] w-[155] hover:underline text-sm"
                  >
                    Download {selectedWallet.name} wallet here.
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Connect with Web Section */}
          <div className="w-full py-3 px-3 bg-white rounded-lg">
            <div className="flex items-center cursor-pointer" onClick={() => setIsWebOpen(!isWebOpen)}>
              {isWebOpen ? <ChevronDownIcon className="h-5 w-5" /> : <ChevronRightIcon className="h-5 w-5" />}
              <span>
                Connect with <span className="font-bold">{selectedWallet.name} Web</span>
              </span>
            </div>
            {isWebOpen && (
              <button onClick={handleConnectWeb} className="w-full mt-3 py-3 border bg-white text-black rounded-lg hover:bg-white/10">
                Connect to {selectedWallet.name} Web
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
