"use client";

import React, { useState } from "react";

import Link from "next/link";

import { Mail, MessageCircle, Phone, Send, SquarePenIcon } from "lucide-react";

import { Button } from "@/shared/ui/button";

import { UserContactsDialog } from "./user-contacts-dialog";

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
  userId?: string;
  extraPhones?: string[];
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
  userId,
  extraPhones,
}: UserContactsCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleEditContacts = () => {
    setIsDialogOpen(true);
    if (onEditContacts) {
      onEditContacts();
    }
  };

  const normalizeDigits = (value?: string) => {
    if (!value) {
      return "";
    }
    const digits = value.replace(/[^\d]/g, "");
    return digits;
  };

  const buildWhatsappUrl = (value?: string, fallbackPhone?: string) => {
    const digits = normalizeDigits(value || fallbackPhone);
    if (!digits) {
      return null;
    }
    return `https://wa.me/${digits}`;
  };

  const buildTelegramUrl = (value?: string, fallbackPhone?: string) => {
    if (value && value.trim().startsWith("@")) {
      return `https://t.me/${value.trim().replace(/^@/, "")}`;
    }
    // if value looks like username (letters/numbers/underscore), use t.me
    if (value && /^[A-Za-z0-9_]+$/.test(value.trim())) {
      return `https://t.me/${value.trim()}`;
    }
    // otherwise try phone-based deep link
    const digits = normalizeDigits(value || fallbackPhone);
    if (!digits) {
      return null;
    }
    return `tg://resolve?phone=${digits}`;
  };

  const buildViberUrl = (value?: string, fallbackPhone?: string) => {
    const digits = normalizeDigits(value || fallbackPhone);
    if (!digits) {
      return null;
    }
    const encoded = encodeURIComponent(`+${digits}`);
    return `viber://chat?number=${encoded}`;
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
          {[...(extraPhones || []), contacts.phone1, contacts.phone2]
            .filter(Boolean)
            .filter((v, i, a) => a.indexOf(v as string) === i)
            .map((p, idx) => (
              <div key={`${p}-${idx}`} className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#3A4754]" />
                <span className="text-sm text-[#6D7A87]">{p as string}</span>
              </div>
            ))}

          {/* Email */}
          <div className="flex items-center gap-3 ">
            <Mail className="h-5 w-5 text-[#3A4754] shrink-0" />
            <span className="text-sm text-[#6D7A87] line-clamp-1 truncate">
              {contacts.email}
            </span>
          </div>
        </div>

        {/* Right Column - Social/Messaging */}
        <div className="space-y-4">
          {/* Viber */}
          <div className="flex items-center gap-3">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#7360f2" }}>
              <MessageCircle className="h-4 w-4 text-white" />
            </div>
            {(() => {
              const href = buildViberUrl(contacts.viber, contacts.phone1);
              const label = contacts.viber || contacts.phone1 || "";
              return href ? (
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#3A4754] hover:underline">
                  {label}
                </Link>
              ) : (
                <span className="text-sm text-[#6D7A87]">{label}</span>
              );
            })()}
          </div>

          {/* Telegram */}
          <div className="flex items-center gap-3">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#229ED9" }}>
              <Send className="h-4 w-4 text-white" />
            </div>
            {(() => {
              const href = buildTelegramUrl(contacts.telegram, contacts.phone1);
              const label = contacts.telegram || contacts.phone1 || "";
              return href ? (
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#3A4754] hover:underline">
                  {label}
                </Link>
              ) : (
                <span className="text-sm text-[#6D7A87]">{label}</span>
              );
            })()}
          </div>

          {/* WhatsApp */}
          <div className="flex items-center gap-3">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#25D366" }}>
              <Phone className="h-4 w-4 text-white" />
            </div>
            {(() => {
              const href = buildWhatsappUrl(contacts.whatsapp, contacts.phone1);
              const label = contacts.whatsapp || contacts.phone1 || "";
              return href ? (
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#3A4754] hover:underline">
                  {label}
                </Link>
              ) : (
                <span className="text-sm text-[#6D7A87]">{label}</span>
              );
            })()}
          </div>
        </div>
      </div>

      <UserContactsDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        userId={userId}
        initialPhones={
          [...(extraPhones || []), contacts.phone1 || "", contacts.phone2 || ""]
            .filter(Boolean)
            .filter((v, i, a) => a.indexOf(v as string) === i) as string[]
        }
      />
    </div>
  );
}
