"use client";

import React from "react";

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

import { cn } from "@/shared/lib/utils";

import "./phone-input.css";

interface PhoneInputFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  error?: boolean;
}

export function PhoneInputField({
  value,
  onChange,
  placeholder = "+38 098 888 88 88",
  className = "",
  disabled = false,
  error = false,
}: PhoneInputFieldProps) {
  return (
    <div className={cn("phone-input-container", error && "error", className)}>
      <PhoneInput
        defaultCountry="ua"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full"
        hideDropdown={true}
        disableCountryGuess={true}
        forceDialCode={true}
        inputClassName={cn(
          "w-full min-w-0 h-[48px] rounded-[48px] bg-transparent px-4 py-3 text-sm",
          "placeholder:text-[#B6BDC3] placeholder:text-sm",
          "border border-[#E5E7EB] focus:outline-none focus:border-[#1D96F9] focus:ring-1 focus:ring-[#1D96F9]"
        )}
      />
    </div>
  );
}
