"use client";

import React from "react";

import Image from "next/image";

import NeqrVockax from "@/public/neqr_s_ockami.png";
import { Edit, Ellipsis, Mail, Phone, Plus, Trash2 } from "lucide-react";

import { CounterpartyContact } from "@/features/counterparties/types/counterparty.types";

import { Button } from "@/shared/ui/button";

interface CounterpartyContactsProps {
  contacts?: CounterpartyContact[];
  onAddContact?: () => void;
  onEditContact?: (contact: CounterpartyContact) => void;
  onDeleteContact?: (contact: CounterpartyContact) => void;
}

export default function CounterpartyContacts({
  contacts = [],
  onAddContact,
  onEditContact,
  onDeleteContact,
}: CounterpartyContactsProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[24px] font-bold text-[#3A4754]">Контакти</h2>
        <div className="flex items-center gap-2">
          {onAddContact && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onAddContact}
              className="bg-white w-[36px] h-[36px] rounded-full border border-[#B6BDC3] text-[#495969] hover:bg-gray-50">
              <Plus size={20} />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="bg-white w-[36px] h-[36px] rounded-full border border-[#B6BDC3] text-[#495969]">
            <Ellipsis size={20} />
          </Button>
        </div>
      </div>

      {/* Contacts */}
      {contacts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">Немає контактів</div>
      ) : (
        <div className="grid grid-cols-2 gap-5">
          {contacts.map(contact => (
            <div
              key={contact.id}
              className="flex items-start gap-4 relative group">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <Image
                  src={NeqrVockax}
                  alt="Contact"
                  width={36}
                  height={36}
                  className="rounded-full"
                />
              </div>

              {/* Contact Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-[#3A4754] mb-2">
                  Контакт
                </h3>

                {/* Phone */}
                {contact.phone && (
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="w-4 h-4 text-[#6D7A87]" />
                    <span className="text-sm text-[#6D7A87]">
                      {contact.phone}
                    </span>
                  </div>
                )}

                {/* Email */}
                {contact.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 flex-shrink-0 text-[#6D7A87]" />
                    <span className="text-sm text-[#6D7A87] break-words">
                      {contact.email}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              {(onEditContact || onDeleteContact) && (
                <div className="absolute top-0 right-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {onEditContact && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEditContact(contact)}
                      className="w-[28px] h-[28px] rounded-full border border-[#B6BDC3] text-[#495969] hover:bg-gray-50">
                      <Edit size={16} />
                    </Button>
                  )}
                  {onDeleteContact && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeleteContact(contact)}
                      className="w-[28px] h-[28px] rounded-full border border-red-300 text-red-600 hover:bg-red-50">
                      <Trash2 size={16} />
                    </Button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
