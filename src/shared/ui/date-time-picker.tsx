"use client";

import * as React from "react";

import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Calendar } from "@/shared/ui/calendar";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";

interface DateTimePickerProps {
  label?: string;
  value?: string; // ISO string like "2024-01-15T09:00:00Z"
  onChange?: (value: string) => void; // Returns ISO string
  placeholder?: string;
  className?: string;
}

export function DateTimePicker({
  label,
  value,
  onChange,
  placeholder = "Select date and time",
  className,
}: DateTimePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [time, setTime] = React.useState<string>("");

  // Initialize from value prop
  React.useEffect(() => {
    if (value) {
      try {
        const dateObj = new Date(value);
        if (!isNaN(dateObj.getTime())) {
          setDate(dateObj);
          // Extract time in HH:mm format
          const hours = String(dateObj.getHours()).padStart(2, "0");
          const minutes = String(dateObj.getMinutes()).padStart(2, "0");
          setTime(`${hours}:${minutes}`);
        }
      } catch (error) {
        console.error("Error parsing date value:", error);
      }
    } else {
      setDate(undefined);
      setTime("");
    }
  }, [value]);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate && time) {
      // Update the date part but keep the time
      const [hours, minutes] = time.split(":");
      const newDate = new Date(selectedDate);
      newDate.setHours(parseInt(hours, 10));
      newDate.setMinutes(parseInt(minutes, 10));
      onChange?.(newDate.toISOString());
    } else if (selectedDate) {
      // If no time is set, set to current time
      const now = new Date();
      selectedDate.setHours(now.getHours());
      selectedDate.setMinutes(now.getMinutes());
      onChange?.(selectedDate.toISOString());
    }
    setOpen(false);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    setTime(newTime);
    if (date && newTime) {
      const [hours, minutes] = newTime.split(":");
      const newDate = new Date(date);
      newDate.setHours(parseInt(hours, 10));
      newDate.setMinutes(parseInt(minutes, 10));
      onChange?.(newDate.toISOString());
    }
  };

  return (
    <div className={`flex gap-4 ${className || ""}`}>
      <div className="flex flex-col gap-3 flex-1">
        {label && (
          <Label htmlFor="date-picker" className="px-1">
            {label}
          </Label>
        )}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker"
              className="w-full justify-between font-normal min-h-[48px] rounded-[48px] bg-white px-4 py-3 border border-[#C8CDD2]">
              {date ? date.toLocaleDateString() : placeholder}
              <ChevronDownIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={handleDateSelect}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-3 flex-1">
        <Label htmlFor="time-picker" className="px-1">
          Час
        </Label>
        <Input
          type="time"
          id="time-picker"
          value={time}
          onChange={handleTimeChange}
          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none min-h-[48px] rounded-[48px] bg-white px-4 py-3 border border-[#C8CDD2]"
        />
      </div>
    </div>
  );
}
