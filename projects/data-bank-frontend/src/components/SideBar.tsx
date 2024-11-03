import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Upload, Coins, LogOut } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";

interface MenuItemProps {
  icon: LucideIcon;
  text: string;
  to: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon: Icon, text, to }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-3 pl-11 py-4 rounded-md transition-colors ${
        isActive ? "text-[#b4d7ea]" : "text-gray-300 hover:bg-white/5 hover:text-white"
      }`}
    >
      <Icon size={18} />
      <span>{text}</span>
    </Link>
  );
};

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  return (
    <div
      className={`flex flex-col bg-[#171618] text-white   py-3 ${
        isOpen ? "pl-4 w-64 h-screen" : "w-full h-auto"
      } transition-all duration-300 ease-in-out`}
    >
      <div className="md:hidden ml-4 " onClick={toggleMobileMenu}>
        {isOpen ? (
          <XMarkIcon className="h-8 w-8 text-[#2B9DDA] ml-20" />
        ) : (
          <div className="flex justify-between items-center px-4">
            <img src="/img/logo.png" alt="Logo" className="h-10 " />
            <Bars3Icon className="h-8 w-8 text-[#2B9DDA]" />
          </div>
        )}
      </div>
      {isOpen && (
        <div className="flex flex-col">
          {/* Header */}
          <img src="/img/logo.png" alt="Logo" className="h-10 w-9/12" />

          {/* Navigation */}
          <nav className="flex-1 py-4">
            <MenuItem icon={Home} text="Home" to="/" />
            <MenuItem icon={Upload} text="Upload Document" to="/upload" />
            <MenuItem icon={Coins} text="NFT Minting" to="/nft" />
          </nav>

          {/* Footer */}
          <div className="pl-11">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3  py-2 text-gray-300 hover:bg-white/5 hover:text-white rounded-md transition-colors w-full"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
