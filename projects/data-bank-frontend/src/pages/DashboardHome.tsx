"use client"

import React, { useEffect, useState } from "react"
import { MoreVertical, X } from "lucide-react"
import DashboardNav from "../components/DashboardNav"
import { useWallet } from "@txnlab/use-wallet"

export default function DashboardHome() {
  interface Nft {
    params: {
      name: string
      url: string
      "url-b64": string
      "unit-name": string
      total: number
    }
  }

  const [nfts, setNfts] = useState<Nft[]>([])
  const [fullscreenNftUrl, setFullscreenNftUrl] = useState("")
  const { activeAddress } = useWallet()

  useEffect(() => {
    if (!activeAddress) return
    const fetchNftData = async () => {
      try {
        const response = await fetch(
          `https://rational-kyle-shagbaortechnology-a92622c9.koyeb.app/api/user-nfts/?wallet_address=${activeAddress}`
        )

        console.log(activeAddress)
        if (!response.ok) {
          throw new Error("Failed to fetch NFT data")
        }

        console.log("NFT data response:", response)
        const data = await response.json()
        setNfts(data.nfts)
        console.log("NFT data:", data)
      } catch (error) {
        console.error("Error fetching NFT data:", error)
      }
    }

    fetchNftData()
  }, [activeAddress])

  const handleNftDoubleClick = (nftUrl: string) => {
    setFullscreenNftUrl(nftUrl)
    document.body.classList.add("overflow-hidden")
  }

  const handleCloseFullscreen = () => {
    setFullscreenNftUrl("")
    document.body.classList.remove("overflow-hidden")
  }

  // Mock data for recent documents
  const recentDocuments = [
    {
      title: "Documents",
      date: "Sep 25, 2022, 12:25 PM",
      shared: ["user1.jpg", "user2.jpg", "user3.jpg"],
      type: "folder",
    },
    {
      title: "Passport",
      date: "Sep 25, 2022, 12:25 PM",
      shared: [],
      type: "folder",
    },
    {
      title: "Documents",
      date: "Sep 25, 2022, 12:25 PM",
      shared: ["user1.jpg", "user2.jpg"],
      type: "folder",
    },
  ]

  return (
    <div className="p-8 text-white bg-[#0D0D0D] min-h-screen mt-20 md:mt-0 md:ml-64">
      <DashboardNav />

      {/* Recent Documents Section */}
      <div className="mb-8">
        {/* ... */}
      </div>

      {/* All Documents Section */}
      <div>
        <h2 className="text-lg font-medium mb-4">All NFTs</h2>
        <div className="bg-[#1E1E1E] rounded-xl border border-gray-800 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-gray-400 text-sm hidden sm:table-row">
                <th className="text-left px-4 sm:px-6 py-2 sm:py-4 font-medium">Name</th>
                <th className="text-left px-4 sm:px-6 py-2 sm:py-4 font-medium">Type</th>
                <th className="text-left px-4 sm:px-6 py-2 sm:py-4 font-medium">Size</th>
                <th className="text-left px-4 sm:px-6 py-2 sm:py-4 font-medium">Date</th>
                <th className="text-right px-4 sm:px-6 py-2 sm:py-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {nfts.map((nft, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-800 text-sm"
                  onDoubleClick={() => handleNftDoubleClick(nft.params.url)}
                >
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#2B9DDA]/10 rounded-lg flex items-center justify-center">
                      <img
                        src={nft.params.url}
                        alt={nft.params.name}
                        className="w-4 h-4"
                      />
                    </div>
                    {nft.params.name}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-[#2B9DDA] text-white rounded-lg">
                      {nft.params["unit-name"]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{nft.params.total}</td>
                  <td className="px-6 py-4 text-gray-400">{new Date().toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleNftDoubleClick(nft.params.url)} className="text-[#2B9DDA] bg-white p-3 px-5 hover:text-[#2B9DDA]/80">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {fullscreenNftUrl && (
        <div
          className="fixed inset-0 w-full h-full bg-[#5e5e5e] bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out"
          onClick={handleCloseFullscreen}
        >
          <div
            className="relative max-w-4xl w-full mx-4 bg-[#1E1E1E] rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={fullscreenNftUrl}
              alt="Fullscreen NFT"
              className="w-full h-auto object-contain max-h-[80vh]"
            />
            <button
              onClick={handleCloseFullscreen}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-200 ease-in-out"
              aria-label="Close fullscreen view"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
