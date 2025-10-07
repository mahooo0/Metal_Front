"use client";

import React from "react";

import { cn } from "@/shared/lib/utils";

import { Button } from "./button";

interface TimePredictionCardProps {
  hours?: number;
  minutes?: number;
  seconds?: number;
  onViewOrder?: () => void;
  className?: string;
}

export function TimePredictionCard({
  hours = 0,
  minutes = 57,
  seconds = 11,
  onViewOrder,
  className,
}: TimePredictionCardProps) {
  const formatTime = (value: number) => {
    return value.toString().padStart(2, "0");
  };

  return (
    <div
      className={cn(
        "bg-white rounded-[16px] p-6 shadow-xl border border-gray-100",
        className
      )}>
      {/* Title */}
      <h3 className="text-center text-lg font-bold text-[#3A4754] mb-6">
        Прогнозований час
      </h3>

      {/* Time Display */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {/* Hours */}
        <div className="bg-[#EBFBFF] rounded-lg px-4 py-3 min-w-[60px]">
          <span className="text-2xl font-bold text-[#6D7A87]">
            {formatTime(hours)}
          </span>
        </div>

        {/* Colon */}
        <span className="text-2xl font-bold text-gray-600">:</span>

        {/* Minutes */}
        <div className="bg-[#EBFBFF] rounded-lg px-4 py-3 min-w-[60px]">
          <span className="text-2xl font-bold text-[#6D7A87]">
            {formatTime(minutes)}
          </span>
        </div>

        {/* Colon */}
        <span className="text-2xl font-bold text-gray-600">:</span>

        {/* Seconds */}
        <div className="bg-[#EBFBFF] rounded-lg px-4 py-3 min-w-[60px]">
          <span className="text-2xl font-bold text-[#6D7A87]">
            {formatTime(seconds)}
          </span>
        </div>
      </div>

      {/* Action Button */}
      <Button onClick={onViewOrder} variant="blue" size="lg" className="w-full">
        Переглянути замовлення
      </Button>
    </div>
  );
}
