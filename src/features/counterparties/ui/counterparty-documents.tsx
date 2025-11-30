"use client";

import React, { useState } from "react";

import Image from "next/image";

import NeqrVockax from "@/public/neqr_s_ockami.png";
import { X } from "lucide-react";

import { CounterpartyDocument } from "@/features/counterparties/types/counterparty.types";

import { Button } from "@/shared/ui/button";

interface CounterpartyDocumentsProps {
  documents?: CounterpartyDocument[];
}

export default function CounterpartyDocuments({
  documents = [],
}: CounterpartyDocumentsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [docs, setDocs] = useState(
    documents.map((doc, index) => ({
      ...doc,
      selected: index === 0,
    }))
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString;
    }
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${dd}.${mm}.${yyyy}`;
  };

  const tabs = ["Документи"];

  const handleDocumentSelect = (id: string) => {
    setDocs(prev =>
      prev.map(doc => ({
        ...doc,
        selected: doc.id === id,
      }))
    );
  };

  const handleDocumentRemove = (id: string) => {
    setDocs(prev => prev.filter(doc => doc.id !== id));
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[24px] font-bold text-[#3A4754]">Документи</h2>
        <Button
          variant="ghost"
          size="icon"
          className="bg-white w-[36px] h-[36px] rounded-full border border-[#B6BDC3] text-[#495969]">
          <span className="text-xl">⋯</span>
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 mb-6 border-b border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`pb-3 text-sm font-medium transition-colors ${
              activeTab === index
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Documents Grid */}
      {docs.length === 0 ? (
        <div className="text-center py-8 text-gray-500">Немає документів</div>
      ) : (
        <div className="flex gap-4 overflow-x-auto">
          {docs.map(doc => (
            <div
              key={doc.id}
              className={`flex-shrink-0 cursor-pointer transition-all  `}
              onClick={() => handleDocumentSelect(doc.id)}>
              {/* Document Preview */}
              <div className="relative rounded-lg border-2 overflow-hidden">
                {/* Close button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1 right-1 w-6 h-6 bg-white rounded-full shadow-sm hover:bg-gray-100"
                  onClick={e => {
                    e.stopPropagation();
                    handleDocumentRemove(doc.id);
                  }}>
                  <X className="w-3 h-3" />
                </Button>

                {/* Document content preview */}
                <Image
                  src={NeqrVockax}
                  alt="NeqrVockax"
                  width={100}
                  className="w-full h-full object-cover border-[#F6F6F6] border-1 rounded-lg"
                  height={100}
                />
              </div>

              {/* Document name */}
              <div className="mt-2 text-center">
                <p className="text-sm text-gray-600 truncate">{doc.name}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {formatDate(doc.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
