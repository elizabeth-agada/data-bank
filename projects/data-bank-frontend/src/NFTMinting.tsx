import React from "react";

export default function NFTMinting() {
  const mintingDocument = {
    type: "Passport",
    uniqueID: "8973626481",
    progress: 60,
  };

  const documents = [
    { name: "Favour-Resume", type: "PDF", size: "12.3 MB", date: "20 November 2023" },
    { name: "Favour-Resume", type: "PDF", size: "12.3 MB", date: "30 November 2023" },
    { name: "Favour-Resume", type: "PDF", size: "12.3 MB", date: "20 November 2023" },
    { name: "Favour-Resume", type: "PDF", size: "12.3 MB", date: "20 November 2023" },
    { name: "Favour-Resume", type: "PDF", size: "12.3 MB", date: "20 November 2023" },
  ];

  return (
    <div className="p-4 sm:p-8 text-white bg-[#171618] min-h-screen mt-12">
      <div className="flex  sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-12">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-0">
          Welcome, <span className="text-[#2B9DDA]">user</span>
        </h1>
        <div className="bg-white text-black px-4 py-2 rounded-lg text-xs sm:text-sm font-mono">6VDFGQZLNU3RTEXULVS</div>
      </div>

      <div className="bg-[#1E1E1E] rounded-xl p-4 sm:p-6 mb-6 sm:mb-12">
        <p className="text-center text-sm sm:text-base mb-4">
          Your document is being minted as an NFT. Please wait while we process this transaction
        </p>
        <div className="relative w-full bg-gray-700 h-2 sm:h-3 rounded-lg overflow-hidden">
          <div className="bg-[#2B9DDA] h-full" style={{ width: `${mintingDocument.progress}%` }}></div>
        </div>
      </div>

      <div className="mb-6 sm:mb-12">
        <h2 className="text-lg font-semibold mb-2 sm:mb-4">Minting Details</h2>
        <div className="text-gray-400 text-sm sm:text-base mb-1">Document Type: {mintingDocument.type}</div>
        <div className="text-gray-400 text-sm sm:text-base">Unique ID: {mintingDocument.uniqueID}</div>
      </div>

      <div className="mb-6 sm:mb-12">
        <h2 className="text-lg font-semibold mb-2 sm:mb-4">NFT Details</h2>
        <button className="text-[#2B9DDA] hover:underline text-sm sm:text-base">View NFT Details</button>
        <button className="text-[#2B9DDA] ml-4 sm:ml-6 hover:underline text-sm sm:text-base">Share NFT</button>
      </div>

      <div>
        <h2 className="text-lg font-medium mb-4 sm:mb-6">Documents</h2>
        <div className="bg-[#1E1E1E] rounded-xl border border-gray-800 overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="text-gray-400 text-sm sm:text-base">
                <th className="text-left px-4 sm:px-6 py-3 font-medium">Name</th>
                <th className="text-left px-4 sm:px-6 py-3 font-medium">Type</th>
                <th className="text-left px-4 sm:px-6 py-3 font-medium">Size</th>
                <th className="text-left px-4 sm:px-6 py-3 font-medium">Date</th>
                <th className="text-right px-4 sm:px-6 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc, index) => (
                <tr key={index} className="border-t border-gray-800 text-sm sm:text-base">
                  <td className="px-4 sm:px-6 py-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#2B9DDA]/10 rounded-lg flex items-center justify-center">
                      <img src="/api/placeholder/32/32" alt="document" className="w-4 h-4" />
                    </div>
                    {doc.name}
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <span className="px-2 py-1 bg-[#2B9DDA] text-white rounded-lg text-xs sm:text-sm">{doc.type}</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-gray-400">{doc.size}</td>
                  <td className="px-4 sm:px-6 py-4 text-gray-400">{doc.date}</td>
                  <td className="px-4 sm:px-6 py-4 text-right">
                    <button className="text-[#2B9DDA] bg-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm hover:text-[#2B9DDA]/80">
                      Mint
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
