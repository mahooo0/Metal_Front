"use client";

import React, { useEffect, useState } from "react";

import { cn } from "@/shared/lib/utils";

interface TimerDisplayProps {
  className?: string;
}

export default function TimerDisplay({ className }: TimerDisplayProps) {
  const [time, setTime] = useState({ hours: 0, minutes: 57, seconds: 11 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animation delay for appearance
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Timer logic (optional - you can remove this if you want static time)
    const interval = setInterval(() => {
      setTime(prev => {
        let { hours, minutes, seconds } = prev;
        seconds += 1;

        if (seconds >= 60) {
          seconds = 0;
          minutes += 1;
        }

        if (minutes >= 60) {
          minutes = 0;
          hours += 1;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (value: number) => value.toString().padStart(2, "0");

  return (
    <div
      className={cn(
        "fixed bottom-[60px] right-0 z-50 transition-all duration-500 ease-in-out",
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0",
        className
      )}>
      {/* Outer grey container */}
      <div className="bg-blue-500 rounded-l-full px-6 py-4 flex items-center gap-2 ">
        {/* Hours segment */}
        <div className="bg-white rounded-lg px-3 py-1 shadow-sm">
          <span className="text-gray-800 font-medium text-lg">
            {formatTime(time.hours)}
          </span>
        </div>

        {/* Colon separator */}
        <span className="text-white font-bold text-lg">:</span>

        {/* Minutes segment */}
        <div className="bg-white rounded-lg px-3 py-1 shadow-sm">
          <span className="text-gray-800 font-medium text-lg">
            {formatTime(time.minutes)}
          </span>
        </div>

        {/* Colon separator */}
        <span className="text-white font-bold text-lg">:</span>

        {/* Seconds segment */}
        <div className="bg-white rounded-lg px-3 py-1 shadow-sm">
          <span className="text-gray-800 font-medium text-lg">
            {formatTime(time.seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}
