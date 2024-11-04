import { Upload } from "lucide-react";
import FileUpload from "./components/FileUpload";
import DocumentSelector from "./components/DocumentSelector";

export default function DashboardUpload() {
  return (
    <div className="py-8 px-12 text-white bg-[#0D0D0D] min-h-screen flex gap-3 flex-col mt-20 md:mt-0 md:ml-64">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">
          Welcome, <span className="text-[#2B9DDA]">user</span>
        </h1>
        <div className="bg-white text-black px-4 py-2 rounded-lg text-sm font-mono">6VDFGQyZLNU3RTEXULVS</div>
      </header>
      <section className="w-full h-full">
        <p className="text-lg mb-3 md:text-start text-center">
          Upload your document securely to the blockchain. choose a document type and set your privacy preferences.
        </p>
        <FileUpload />
        <section className="mt-5">
          <DocumentSelector />
        </section>
        <button className="flex gap-2 items-center justify-center text-black  px-5 py-2 bg-white font-semibold md:text-lg rounded-lg hover:bg-[#2B9DDA]/20 transition-colors hover:bg-[#ececec] mt-7 md:ml-5 text-center w-full md:w-auto">
          <Upload size={15} />
          Upload
        </button>
      </section>
    </div>
  );
}
