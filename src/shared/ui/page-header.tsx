"use client";

import React from "react";

import { LucideIcon } from "lucide-react";

import { Button } from "./button";

interface PageHeaderProps {
  title: string;
  count?: number;
  buttonText?: string;
  buttonIcon?: LucideIcon;
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "blue" | "blueTransparent" | "balck" | "BlackTransparent";
  buttonSize?: "default" | "sm" | "lg" | "icon" | "custom";
  onButtonClick?: () => void;
  className?: string;
  showMargin?: boolean;
}

export function PageHeader({
  title,
  count,
  buttonText,
  buttonIcon: ButtonIcon,
  buttonVariant = "balck",
  buttonSize = "lg",
  onButtonClick,
  className = "",
  showMargin = true,
}: PageHeaderProps) {
  return (
    <div className={`flex items-center justify-between gap-4 w-full ${showMargin ? "mb-5" : ""} ${className}`}>
      <h1 className="text-[#3A4754] text-[32px] font-bold">
        {title}
        {count !== undefined && (
          <span className="text-[#B6BDC3]"> ({count})</span>
        )}
      </h1>
      {buttonText && (
        <Button
          variant={buttonVariant}
          size={buttonSize}
          onClick={onButtonClick}
          className={buttonSize === "lg" ? "h-[42px]" : ""}>
          {ButtonIcon && <ButtonIcon className="w-5 h-5" />}
          {buttonText}
        </Button>
      )}
    </div>
  );
}

