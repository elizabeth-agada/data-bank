import { useState } from "react";

export default function DocumentSelector() {
  const [selectedDocument, setSelectedDocument] = useState<string>("id-card");

  const documents = [
    { id: "id-card", label: "Id Card" },
    { id: "passport", label: "Passport" },
    { id: "birth-certificate", label: "Birth Certificate" },
    { id: "school-certificate", label: "School Certificate" },
    { id: "house-lease", label: "House lease" },
    { id: "license", label: "License" },
  ];

  return (
    <div className="p-6 rounded-lg">
      <h2 className="text-center md:text-start text-white text-lg font-semibold mb-4">Select Document Type</h2>
      <div className="flex flex-wrap md:items-start items-center justify-center md:justify-start gap-2">
        {documents.map((doc) => (
          <button
            key={doc.id}
            onClick={() => setSelectedDocument(doc.id)}
            className={`
              px-4 py-2 rounded-md text-sm font-medium
              transition-colors duration-200
              ${selectedDocument === doc.id ? "bg-white text-gray-900" : "text-white border hover:bg-gray-700"}
              focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900
            `}
          >
            {doc.label}
          </button>
        ))}
      </div>
    </div>
  );
}
