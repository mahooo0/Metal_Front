"use client";

import React from "react";

import Image from "next/image";

import NeqrVockax from "@/public/neqr_s_ockami.png";
import { Ellipsis, Mail, Phone } from "lucide-react";

import { Button } from "@/shared/ui/button";

interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
  avatar?: string;
}

interface CounterpartyContactsProps {
  contacts?: Contact[];
}

export default function CounterpartyContacts({
  contacts = [
    {
      id: 1,
      name: "Henry Arthur",
      phone: "(217) 555-0113",
      email: "binhan628@gmail.com",
    },
    {
      id: 2,
      name: "Henry Arthur",
      phone: "(217) 555-0113",
      email: "binhan628@gmail.com",
    },
  ],
}: CounterpartyContactsProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[24px] font-bold text-[#3A4754]">Контакти</h2>
        <Button
          variant="ghost"
          size="icon"
          className="bg-white w-[36px] h-[36px] rounded-full border border-[#B6BDC3] text-[#495969]">
          <Ellipsis size={20} />
        </Button>
      </div>

      {/* Contacts */}
      <div className="grid grid-cols-2 gap-5">
        {contacts.map(contact => (
          <div key={contact.id} className="flex items-start gap-4">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <Image
                src={NeqrVockax}
                alt="NeqrVockax"
                width={36}
                height={36}
                className="rounded-full"
              />
            </div>

            {/* Contact Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-[#3A4754] mb-2">
                {contact.name}
              </h3>

              {/* Phone */}
              <div className="flex items-center gap-2 mb-2">
                <Phone className="w-4 h-4 text-[#6D7A87]" />
                <span className="text-sm text-[#6D7A87]">{contact.phone}</span>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0 text-[#6D7A87]" />
                <span className="text-sm text-[#6D7A87]">{contact.email}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
