import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import WalletConnector from './WalletConnector';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div className="grid grid-cols-12 max-w-7xl mx-auto items-center bg-[#5e5e5e] bg-opacity-50 rounded-2xl py-4 px-6 mt-5 text-white z-10">
        <div className="col-span-6 md:col-span-4 flex justify-start">
          <img src="/img/logo.png" alt="Logo" className="h-8" />
        </div>

        <div className="hidden md:col-span-4 md:flex justify-center space-x-6 font-semibold text-lg">
          <a href="#" className="hover:text-[#2B9DDA]">Home</a>
          <a href="/how" className="hover:text-[#2B9DDA]">How Does It Work</a>
          <a href="#" className="hover:text-[#2B9DDA]">About Us</a>
        </div>

        <div className="col-span-6 md:col-span-4 flex justify-end">
          <div className="relative">
            <button
              onClick={() => setIsWalletOpen(!isWalletOpen)}
              className="md:px-5 text-sm py-4 bg-white text-black rounded-xl font-semibold hover:bg-gray-200 transition duration-200"
            >
              Connect Wallet
            </button>
            <WalletConnector
              isOpen={isWalletOpen}
              onClose={() => setIsWalletOpen(false)}
            />
          </div>

          <div className="md:hidden ml-4" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-8 w-8 text-white" />
            ) : (
              <Bars3Icon className="h-8 w-8 text-white" />
            )}
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="flex flex-col items-center space-y-2 mt-3 md:hidden bg-[#2b2b2b] bg-opacity-50 rounded-lg py-3 text-white">
          <a href="#" className="hover:text-[#2B9DDA] font-semibold text-lg">Home</a>
          <a href="/how" className="hover:text-[#2B9DDA] font-semibold text-lg">How Does It Work</a>
          <a href="#" className="hover:text-[#2B9DDA] font-semibold text-lg">About Us</a>
        </div>
      )}
    </>
  );
}
