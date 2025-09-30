"use client";

import React from "react";

import {
  Mail,
  MessageCircle,
  MessageSquare,
  Pencil,
  Phone,
  Send,
  SquarePenIcon,
} from "lucide-react";

import { Button } from "@/shared/ui/button";

interface UserContactsCardProps {
  contacts?: {
    phone1?: string;
    phone2?: string;
    email?: string;
    viber?: string;
    telegram?: string;
    whatsapp?: string;
  };
  onEditContacts?: () => void;
}

export default function UserContactsCard({
  contacts = {
    phone1: "(217) 555-0113",
    phone2: "(217) 555-0113",
    email: "binhan628@gmail.com",
    viber: "@olive_dixon",
    telegram: "@olive_dixon",
    whatsapp: "@olive_dixon",
  },
  onEditContacts,
}: UserContactsCardProps) {
  const handleEditContacts = () => {
    if (onEditContacts) {
      onEditContacts();
    }
  };

  return (
    <div className="bg-white rounded-[16px] p-6 w-full">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {/* Phone Icon */}
          <div className="w-8 h-8 bg-[#3A4754] rounded-lg flex items-center justify-center">
            <Phone className="h-5 w-5 text-white" />
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-[#3A4754]">Контакти</h3>
        </div>

        {/* Edit Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleEditContacts}
          className="h-8 w-8 rounded-full hover:bg-gray-100 border border-[#E0E0E0]">
          <SquarePenIcon className="h-4 w-4 text-[#3A4754]" />
        </Button>
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Left Column - Phone & Email */}
        <div className="space-y-4">
          {/* Phone 1 */}
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-[#3A4754]" />
            <span className="text-sm text-[#6D7A87]">{contacts.phone1}</span>
          </div>

          {/* Phone 2 */}
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-[#3A4754]" />
            <span className="text-sm text-[#6D7A87]">{contacts.phone2}</span>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-[#3A4754]" />
            <span className="text-sm text-[#6D7A87]">{contacts.email}</span>
          </div>
        </div>

        {/* Right Column - Social/Messaging */}
        <div className="space-y-4">
          {/* Viber */}
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <MessageCircle className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm text-[#6D7A87]">{contacts.viber}</span>
          </div>

          {/* Telegram */}
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <Send className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm text-[#6D7A87]">{contacts.telegram}</span>
          </div>

          {/* WhatsApp */}
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <Phone className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm text-[#6D7A87]">{contacts.whatsapp}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
