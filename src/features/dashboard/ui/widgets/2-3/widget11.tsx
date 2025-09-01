import React, { useState } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/shared/ui/button";

// Default size for this widget
export const defaultSize = { w: 2, h: 3 };

// Ukrainian month names
const ukrainianMonths = [
  "Січень",
  "Лютий",
  "Березень",
  "Квітень",
  "Травень",
  "Червень",
  "Липень",
  "Серпень",
  "Вересень",
  "Жовтень",
  "Листопад",
  "Грудень",
];

// Ukrainian weekday names
const ukrainianWeekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];

export default function Widget11() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 1)); // November 2025

  // Mock events data
  const events = [
    {
      date: new Date(2025, 10, 1),
      colors: ["bg-blue-400", "bg-pink-400", "bg-blue-500"],
    },
    { date: new Date(2025, 10, 3), colors: ["bg-orange-400", "bg-orange-500"] },
    { date: new Date(2025, 10, 4), colors: ["bg-orange-400", "bg-orange-500"] },
    { date: new Date(2025, 10, 8), colors: ["bg-orange-400", "bg-orange-500"] },
    {
      date: new Date(2025, 10, 10),
      colors: ["bg-blue-400", "bg-pink-400", "bg-blue-500"],
    },
    { date: new Date(2025, 10, 12), colors: ["bg-blue-400", "bg-blue-500"] },
    {
      date: new Date(2025, 10, 14),
      colors: ["bg-orange-400", "bg-orange-500"],
    },
    { date: new Date(2025, 10, 15), colors: ["bg-blue-400", "bg-blue-500"] },
    {
      date: new Date(2025, 10, 17),
      colors: ["bg-blue-400", "bg-pink-400", "bg-blue-500"],
    },
    { date: new Date(2025, 10, 18), colors: ["bg-blue-400", "bg-blue-500"] },
    {
      date: new Date(2025, 10, 20),
      colors: ["bg-blue-400", "bg-pink-400", "bg-blue-500"],
    },
    {
      date: new Date(2025, 10, 21),
      colors: ["bg-blue-400", "bg-pink-400", "bg-blue-500"],
    },
    {
      date: new Date(2025, 10, 23),
      colors: ["bg-orange-400", "bg-orange-500"],
    },
    { date: new Date(2025, 10, 24), colors: ["bg-blue-400", "bg-blue-500"] },
    {
      date: new Date(2025, 10, 26),
      colors: ["bg-blue-400", "bg-pink-400", "bg-blue-500"],
    },
    {
      date: new Date(2025, 10, 27),
      colors: ["bg-orange-400", "bg-orange-500"],
    },
    { date: new Date(2025, 10, 29), colors: ["bg-blue-400", "bg-blue-500"] },
  ];

  const getEventsForDate = (date: Date) => {
    return events.find(
      event =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear()
    );
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getPreviousMonthDays = (date: Date) => {
    const firstDay = getFirstDayOfMonth(date);
    const daysInPrevMonth = new Date(
      date.getFullYear(),
      date.getMonth(),
      0
    ).getDate();
    const days = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(
        new Date(date.getFullYear(), date.getMonth() - 1, daysInPrevMonth - i)
      );
    }

    return days;
  };

  const getCurrentMonthDays = (date: Date) => {
    const daysInMonth = getDaysInMonth(date);
    const days = [];

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(date.getFullYear(), date.getMonth(), i));
    }

    return days;
  };

  const getNextMonthDays = (date: Date, totalDays: number) => {
    const days = [];
    const remainingDays = 42 - totalDays; // 6 rows * 7 days = 42

    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(date.getFullYear(), date.getMonth() + 1, i));
    }

    return days;
  };

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const previousMonthDays = getPreviousMonthDays(currentDate);
  const currentMonthDays = getCurrentMonthDays(currentDate);
  const nextMonthDays = getNextMonthDays(
    currentDate,
    previousMonthDays.length + currentMonthDays.length
  );

  const allDays = [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];

  return (
    <div className="flex flex-col p-4 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#3A4754]">Календар</h3>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center gap-3 mb-4 py-[14px] px-[17px] border-[#C8CDD2] border rounded-[48px] w-fit">
        <Button
          variant="ghost"
          onClick={goToPreviousMonth}
          className="!p-0 h-3">
          <ChevronLeft className="w-3 h-3" />
        </Button>

        <span className="text-[12px] font-medium text-[#3A4754]">
          {ukrainianMonths[currentDate.getMonth()]} {currentDate.getFullYear()}
        </span>

        <Button onClick={goToNextMonth} className="!p-0 h-3" variant="ghost">
          <ChevronRight className="w-3 h-3" />
        </Button>
      </div>

      {/* Weekdays Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {ukrainianWeekdays.map((day, index) => (
          <div
            key={index}
            className="text-[#929BA5] text-xs font-medium w-8 h-8 flex items-center justify-center">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {allDays.map((date, index) => {
          const dayEvents = getEventsForDate(date);
          const isCurrentMonthDay = isCurrentMonth(date);
          const isTodayDate = isToday(date);

          return (
            <div
              key={index}
              className={`relative w-8 h-8 flex flex-col items-center justify-center text-sm cursor-pointer transition-colors ${
                isCurrentMonthDay
                  ? "text-[#3A4754]"
                  : "text-gray-400 opacity-50"
              } ${
                isTodayDate
                  ? "bg-gray-200 rounded-md"
                  : "hover:bg-gray-100 rounded-md"
              }`}>
              <span className="text-xs">{date.getDate()}</span>

              {dayEvents && (
                <div className="flex gap-0.5 mt-0.5">
                  {dayEvents.colors.slice(0, 3).map((color, eventIndex) => (
                    <div
                      key={eventIndex}
                      className={`w-1 h-1 rounded-full ${color}`}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
