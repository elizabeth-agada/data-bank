import { useState, useRef } from "react";

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };
  // w-full h-4/5 border-2 border-[#2B9DDA] border-dashed rounded-xl flex items-center justify-center p-10 md:p-24 cursor-pointer
  return (
    <div
      className="w-full h-4/5  p-10 md:p-24 cursor-pointer bg-gray-900 rounded-xl border-2 border-dashed border-blue-500"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center text-center">
        <img src="/img/upload2.png" alt="upload image" />
        <p className="text-gray-300 mb-2">select your file or drag and drop</p>
        <p className="text-gray-500 text-sm mb-4">png, pdf, jpg, docx accepted</p>
        <button
          onClick={handleBrowseClick}
          className="px-4 py-2 bg-white text-gray-900 rounded-md font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Browse
        </button>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".png,.pdf,.jpg,.docx" className="hidden" />
      </div>
      {file && <p className="mt-4 text-center text-green-500">File selected: {file.name}</p>}
    </div>
  );
}
