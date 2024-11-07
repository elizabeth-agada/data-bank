import React, { useEffect, useState } from "react"
import { MoreVertical, X } from "lucide-react"
import DashboardNav from "../components/DashboardNav"
import { useWallet } from "@txnlab/use-wallet"

const DEFAULTIMG = "/img/file.png"

export default function DashboardHome() {
  interface Nft {
    params: {
      name: string
      url: string
      "url-b64": string
      "unit-name": string
      total: number
    }
    imageUrl?: string
  }

  const [nfts, setNfts] = useState<Nft[]>([]);
  const [fullscreenNftUrl, setFullscreenNftUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { activeAddress } = useWallet();

  // Function to check if a URL is a valid image
  const checkImageURL = (url: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image()
      img.src = url
      img.onload = () => resolve(url)
      img.onerror = () => resolve(DEFAULTIMG)
    })
  }

  useEffect(() => {
    if (!activeAddress) return
    const fetchNftData = async () => {
      setLoading(true);
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

        // Check each NFT URL and set imageUrl property accordingly
        const nftsWithImages: Nft[] = await Promise.all(
          data.nfts.map(async (nft: Nft): Promise<Nft> => {
            const imageUrl: string = await checkImageURL(nft.params.url)
            return { ...nft, imageUrl }
          })
        )


        setNfts(nftsWithImages);

        console.log("NFT data:", data);

      } catch (error) {
        console.error("Error fetching NFT data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNftData()
  }, [activeAddress]);

  const handleNftDoubleClick = (nftUrl: string) => {
    setFullscreenNftUrl(nftUrl)
    document.body.classList.add("overflow-hidden")
  }

  const handleCloseFullscreen = () => {
    setFullscreenNftUrl("")
    document.body.classList.remove("overflow-hidden")
  }


  return (
    <div className="p-8 text-white bg-[#0D0D0D] min-h-screen mt-20 md:mt-0 md:ml-64">
      <DashboardNav />

      {/* All Documents Section */}
      <div>
        <h2 className="text-lg font-medium mb-2 md:mt-7">All NFTs</h2>
        {loading && <div className="min-h-[100px] flex items-center justify-center bg-black/90 p-6 rounded-lg border-[#2B9DDA]">
          <div className="w-full max-w-xl space-y-4">
            <p className="text-white text-center">
              Your NFTs are being fetched. Please wait while we process this transaction
            </p>
            <div className="w-full bg-gray-800 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-[#2B9DDA] h-full rounded-full animate-indeterminate"
              />
            </div>
          </div>
        </div>}

        {/* Display message if no NFTs found after loading */}
        {!loading && nfts.length === 0 && (
          <div className="text-center text-xl text-white">You haven't minted an NFT yet.</div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-5 xl:gap-8 rounded-xl border sm:border-white md;border-none overflow-x-auto p-5">
          {nfts.map((nft, index) => (
            <div
              key={index}
              className="flex flex-col gap-1 p-3 bg-[#1E1E1E] rounded-md cursor-pointer border border-[#2B9DDA] hover:bg-[#3f3f3f] hover:border-gray-900 transition-colors h-11/12"
              onDoubleClick={() => handleNftDoubleClick(nft.params.url)}
            >
              <img src={nft.imageUrl} alt={nft.params.name} className="rounded-lg object-contain h-20 md:h-40 w-full" />
              <div className="text-start mt-2 ml-2 mb-2 ">
                <p className="md:text-xl md:mb-2">{nft.params.name}</p>
                <p className="md:text-xs text-[#2B9DDA]">{nft.params["unit-name"]}</p>
              </div>
              <button
                onClick={() => handleNftDoubleClick(nft.params.url)}
                className="px-4 py-2 bg-white text-gray-900 rounded-full font-medium hover:bg-[#2B9DDA] focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                View
              </button>
            </div>
          ))}
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
