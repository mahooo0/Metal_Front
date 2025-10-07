"use client";

import React, { useEffect, useState } from "react";

import { cn } from "@/shared/lib/utils";

interface AnimatedTimePredictionCardProps {
  initialHours?: number;
  initialMinutes?: number;
  initialSeconds?: number;
  onViewOrder?: () => void;
  className?: string;
  autoCountdown?: boolean;
}

export function AnimatedTimePredictionCard({
  initialHours = 0,
  initialMinutes = 57,
  initialSeconds = 11,
  onViewOrder,
  className,
  autoCountdown = false,
}: AnimatedTimePredictionCardProps) {
  const [hours, setHours] = useState(initialHours);
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (!autoCountdown) {
      return;
    }

    const interval = setInterval(() => {
      setSeconds(prev => {
        if (prev > 0) {
          return prev - 1;
        } else {
          setMinutes(prevMinutes => {
            if (prevMinutes > 0) {
              return prevMinutes - 1;
            } else {
              setHours(prevHours => {
                if (prevHours > 0) {
                  return prevHours - 1;
                } else {
                  // Reset to initial values when countdown reaches zero
                  setMinutes(initialMinutes);
                  setSeconds(initialSeconds);
                  return initialHours;
                }
              });
              return 59;
            }
          });
          return 59;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [autoCountdown, initialHours, initialMinutes, initialSeconds]);

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
      <h3 className="text-center text-lg font-semibold text-gray-800 mb-6">
        Прогнозований час
      </h3>

      {/* Time Display */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {/* Hours */}
        <div className="bg-blue-100 rounded-lg px-4 py-3 min-w-[60px] transition-all duration-300">
          <span className="text-2xl font-bold text-gray-800">
            {formatTime(hours)}
          </span>
        </div>

        {/* Colon */}
        <span className="text-2xl font-bold text-gray-600">:</span>

        {/* Minutes */}
        <div className="bg-blue-100 rounded-lg px-4 py-3 min-w-[60px] transition-all duration-300">
          <span className="text-2xl font-bold text-gray-800">
            {formatTime(minutes)}
          </span>
        </div>

        {/* Colon */}
        <span className="text-2xl font-bold text-gray-600">:</span>

        {/* Seconds */}
        <div className="bg-blue-100 rounded-lg px-4 py-3 min-w-[60px] transition-all duration-300">
          <span className="text-2xl font-bold text-gray-800">
            {formatTime(seconds)}
          </span>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={onViewOrder}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        Переглянути замовлення
      </button>
    </div>
  );
}
