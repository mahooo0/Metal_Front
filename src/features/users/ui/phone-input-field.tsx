"use client";

import React from "react";

import { cn } from "@/shared/lib/utils";
import { PhoneInput } from "@/shared/ui/phone-input";

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
    <div className={cn("w-full", className)}>
      <PhoneInput
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        error={error}
        className={cn("w-full", className)}
      />
    </div>
  );
}
