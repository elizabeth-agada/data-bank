import { Coins } from "lucide-react";
import React, { useState, useRef } from "react";
import { useWallet } from "@txnlab/use-wallet";

export default function FileUpload(): JSX.Element {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { activeAddress } = useWallet();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName("");
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      setFile(droppedFile);
      setFileName("");
    }
  };

  const handleBrowseClick = (): void => {
    fileInputRef.current?.click();
  };

  const uploadFile = async (user_wallet_address: string | undefined, document: File, document_name: string): Promise<void> => {
    const formData = new FormData();
    formData.append("document", document);
    if (user_wallet_address) {
      formData.append("user_wallet_address", user_wallet_address);
    }
    formData.append("document_name", document_name);

    try {
      const response = await fetch("https://rational-kyle-shagbaortechnology-a92622c9.koyeb.app/api/document-upload/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const result = await response.json();
      console.log("File uploaded successfully:", result);
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    } finally {
      setFile(null);
      setFileName("");
    }
  };

  const handleMintClick = async (): Promise<void> => {
    if (file && fileName) {
      setLoading(true);
      try {
        await uploadFile(activeAddress, file, fileName);
        alert("File uploaded successfully!");
      } catch (error) {
        if (error instanceof Error) {
          alert("Upload failed: " + error.message);
        } else {
          alert("Upload failed: An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please select a file and provide a name.");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {loading ? (
        <div className="min-h-[100px] flex items-center justify-center bg-black/90 p-6 rounded-lg">
          <div className="w-full max-w-xl space-y-4">
            <p className="text-white text-center">
              Your document is being minted as an NFT. Please wait while we process this transaction
            </p>
            <div className="w-full bg-gray-800 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-cyan-500 h-full rounded-full w-1/3 animate-indeterminate"
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div
            className="w-full h-4/5 p-10 md:p-24 cursor-pointer bg-gray-900 rounded-xl border-2 border-dashed border-blue-500"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center text-center">
              <img src="/img/upload2.png" alt="upload image" className="mb-4 w-16 h-16" />
              <p className="text-gray-300 mb-2">Select your file or drag and drop</p>
              <p className="text-gray-500 text-sm mb-4">PNG, PDF, JPG, DOCX accepted</p>
              <button
                onClick={handleBrowseClick}
                className="px-4 py-2 bg-white text-gray-900 rounded-md font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Browse
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".png,.pdf,.jpg,.docx"
                className="hidden"
              />
            </div>

            {file && (
              <div className="mt-4 text-center">
                <p className="text-green-500">File selected: {file.name}</p>
                <input
                  type="text"
                  placeholder="Enter a name for your document"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="mt-4 p-2 border border-gray-300 rounded-md w-full bg-gray-800 text-black"
                />
              </div>
            )}
          </div>
          <button
            onClick={handleMintClick}
            className="flex gap-2 items-center justify-center text-black px-5 py-2 bg-white font-semibold md:text-lg rounded-lg hover:bg-[#2B9DDA]/20 transition-colors mt-7 w-full"
          >
            <Coins size={17} />
            Mint
          </button>
        </>
      )}
      <style>{`
  @keyframes indeterminate {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
  .animate-indeterminate {
    animation: indeterminate 1.5s infinite linear;
  }
`}</style>
    </div>
  );
}
