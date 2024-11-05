// import React, { useEffect, useState } from "react";
// import { XMarkIcon, ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
// import WalletConnect from "@walletconnect/client";

// interface Wallet {
//   id: string;
//   name: string;
// }

// interface PeraWalletPopupProps {
//   isOpen: boolean;
//   onClose: () => void;
//   selectedWallet: Wallet | null;
// }

// export default function WalletPopup({ isOpen, onClose, selectedWallet }: PeraWalletPopupProps) {
//   const [isMobileOpen, setIsMobileOpen] = useState(true);
//   const [isWebOpen, setIsWebOpen] = useState(false);
//   const [connector, setConnector] = useState<WalletConnect | null>(null);
//   const [uri, setUri] = useState<string | null>(null);

//   useEffect(() => {
//     const newConnector = new WalletConnect({
//       bridge: "https://bridge.walletconnect.org",
//     });

//     if (newConnector.connected) {
//       setUri(newConnector.uri);
//     } else {
//       newConnector.createSession().then(() => {
//         setUri(newConnector.uri);
//       });
//     }

//     setConnector(newConnector);
//     newConnector.on("connect", (error, payload) => {
//       if (error) throw error;
//       console.log("Connected!", payload);
//     });

//     newConnector.on("disconnect", (error) => {
//       if (error) throw error;
//       console.log("Disconnected");
//     });

//     return () => {
//       if (newConnector) {
//         newConnector.killSession();
//       }
//     };
//   }, []);

//   const handleConnectWeb = () => {
//     if (connector && selectedWallet) {
//       console.log(`Connecting to ${selectedWallet.name} web interface`);
//     }
//   };

//   if (!isOpen || !selectedWallet) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" style={{ margin: 0 }}>
//       <div className="bg-[#F2F4F6] w-full max-w-lg mx-4 md:mx-auto rounded-2xl shadow-xl">
//         <div className="flex flex-col h-full">
//           {/* Header */}
//           <div className="p-6 border-b border-gray-200">
//             <div className="flex justify-between items-center">
//               <img src="./img/pera.png" alt="Wallet Logo" className="h-8" />
//               <button
//                 onClick={onClose}
//                 className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
//               >
//                 <XMarkIcon className="h-5 w-5" />
//               </button>
//             </div>
//             <h2 className="text-xl font-medium text-[#3C3C49] mt-4">
//               Simply the best Algorand wallet
//             </h2>
//           </div>

//           {/* Content */}
//           <div className="p-6 space-y-4">
//             {/* Mobile Section */}
//             <div className="bg-white rounded-2xl shadow-sm">
//               <button
//                 className="w-full p-4 flex items-center space-x-2 text-left"
//                 onClick={() => setIsMobileOpen(!isMobileOpen)}
//               >
//                 {isMobileOpen ?
//                   <ChevronDownIcon className="h-5 w-5 text-gray-500" /> :
//                   <ChevronRightIcon className="h-5 w-5 text-gray-500" />
//                 }
//                 <span className="text-[#3C3C49]">
//                   Connect with <span className="font-semibold">{selectedWallet.name} Mobile</span>
//                 </span>
//               </button>

//               {isMobileOpen && (
//                 <div className="p-4 border-t border-gray-100">
//                   <div className="flex flex-col items-center space-y-4">
//                     {uri && (
//                       <div className="bg-white p-4 rounded-lg shadow-sm">
//                         <img src="./img/pera-qr.png" alt="QR Code" className="mx-auto" />
//                       </div>
//                     )}
//                     <p className="text-gray-600 text-sm">
//                       Don't have {selectedWallet.name} wallet app?
//                     </p>
//                     <div className="flex items-center space-x-2">
//                       <img src="./img/Category.png" alt="" className="h-5 w-5" />
//                       <a
//                         href="https://perawallet.app/"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-[#6B0DFA] text-sm hover:underline"
//                       >
//                         Download {selectedWallet.name} wallet here.
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Web Section */}
//             <div className="bg-white rounded-2xl shadow-sm">
//               <button
//                 className="w-full p-4 flex items-center space-x-2 text-left"
//                 onClick={() => setIsWebOpen(!isWebOpen)}
//               >
//                 {isWebOpen ?
//                   <ChevronDownIcon className="h-5 w-5 text-gray-500" /> :
//                   <ChevronRightIcon className="h-5 w-5 text-gray-500" />
//                 }
//                 <span className="text-[#3C3C49]">
//                   Connect with <span className="font-semibold">{selectedWallet.name} Web</span>
//                 </span>
//               </button>

//               {isWebOpen && (
//                 <div className="p-4 border-t border-gray-100">
//                   <button
//                     onClick={handleConnectWeb}
//                     className="w-full py-3 px-4 bg-white border border-gray-200 text-[#3C3C49] rounded-lg hover:bg-gray-50 transition-colors font-medium"
//                   >
//                     Connect to {selectedWallet.name} Web
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
