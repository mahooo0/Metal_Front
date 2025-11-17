"use client";

import * as React from "react";

import { cn } from "@/shared/lib/utils";

import { Input } from "./input";

interface PhoneInputProps
  extends Omit<React.ComponentProps<"input">, "onChange" | "value"> {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
}

function PhoneInput({
  className,
  value,
  onChange,
  error,
  placeholder = "+38 098 888 88 88",
  ...props
}: PhoneInputProps) {
  const formatPhoneNumber = (input: string): string => {
    // Удаляем все нецифровые символы кроме +
    const cleaned = input.replace(/[^\d+]/g, "");

    // Если начинается не с +, добавляем +38
    if (!cleaned.startsWith("+")) {
      if (cleaned.length === 0) {
        return "";
      }
      // Если начинается с 38, добавляем +
      if (cleaned.startsWith("38")) {
        return `+${cleaned}`;
      }
      // Иначе добавляем +38
      return `+38${cleaned}`;
    }

    // Если начинается с +, но не с +38, оставляем как есть или форматируем
    if (cleaned.startsWith("+38")) {
      const digits = cleaned.slice(3).replace(/\D/g, "");
      if (digits.length === 0) {
        return "+38";
      }
      if (digits.length <= 3) {
        return `+38 ${digits}`;
      }
      if (digits.length <= 6) {
        return `+38 ${digits.slice(0, 3)} ${digits.slice(3)}`;
      }
      return `+38 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 10)}`;
    }

    return cleaned;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    onChange(formatted);
  };

  return (
    <Input
      type="tel"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={cn(
        error && "border-red-500 focus:border-red-500 focus:ring-red-500",
        className
      )}
      {...props}
    />
  );
}

export { PhoneInput };
