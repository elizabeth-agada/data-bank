import React from "react";
import { MoreVertical } from "lucide-react";

export default function DashboardHome() {
  // Mock data for recent and all documents
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
  ];

  const allDocuments = [
    { name: "Favour-Resume", type: "PDF", size: "12.3 MB", date: "20 November 2023" },
    { name: "Favour-Resume", type: "PDF", size: "12.3 MB", date: "30 November 2023" },
    { name: "Favour-Resume", type: "PDF", size: "12.3 MB", date: "20 November 2023" },
    { name: "Favour-Resume", type: "PDF", size: "12.3 MB", date: "20 November 2023" },
    { name: "Favour-Resume", type: "PDF", size: "12.3 MB", date: "20 November 2023" },
    { name: "Favour-Resume", type: "PDF", size: "12.3 MB", date: "20 November 2023" },
  ];

  return (
    <div className="p-8 text-white bg-[#0D0D0D] min-h-screen mt-20 md:mt-0 md:ml-64">
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-2xl font-semibold">
          Welcome, <span className="text-[#2B9DDA]">user</span>
        </h1>
        <div className="bg-white text-black px-4 py-2 rounded-lg text-sm font-mono">6VDFGQZLNU3RTEXULVS</div>
      </div>

      {/* Recent Documents Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Recent Documents</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentDocuments.map((doc, index) => (
            <div key={index} className="bg-[#1E1E1E] rounded-xl p-4 border border-gray-800">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#2B9DDA]/10 rounded-lg flex items-center justify-center">
                    <img src="/api/placeholder/40/40" alt="folder" className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">{doc.title}</h3>
                    <p className="text-xs text-gray-400">{doc.date}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-white">
                  <MoreVertical size={16} />
                </button>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex -space-x-2">
                  {doc.shared.map((user, idx) => (
                    <div key={idx} className="w-6 h-6 rounded-full border-2 border-[#1E1E1E] bg-gray-300">
                      <img src="/api/placeholder/24/24" alt="user" className="w-full h-full rounded-full" />
                    </div>
                  ))}
                </div>
                <button className="px-3 py-1 bg-white text-[#2B9DDA] text-xs sm:text-sm rounded-lg hover:bg-[#2B9DDA]/20 transition-colors">
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Documents Section */}
      <div>
        <h2 className="text-lg font-medium mb-4">All Documents</h2>
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
              {allDocuments.map((doc, index) => (
                <tr key={index} className="border-t border-gray-800 text-sm">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#2B9DDA]/10 rounded-lg flex items-center justify-center">
                      <img src="/api/placeholder/32/32" alt="document" className="w-4 h-4" />
                    </div>
                    {doc.name}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-[#2B9DDA] text-white rounded-lg">{doc.type}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{doc.size}</td>
                  <td className="px-6 py-4 text-gray-400">{doc.date}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[#2B9DDA] bg-white p-3 px-5 hover:text-[#2B9DDA]/80">Share</button>
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
