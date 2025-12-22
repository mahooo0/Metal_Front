"use client";

import * as React from "react";

import { format } from "date-fns";
import { uk } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { type DateRange } from "react-day-picker";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Calendar } from "@/shared/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";

interface DateRangePickerProps {
  value?: { from?: Date; to?: Date };
  onChange?: (range: { from?: Date; to?: Date }) => void;
  placeholder?: string;
  className?: string;
}

export function DateRangePicker({
  value,
  onChange,
  placeholder = "Оберіть період",
  className,
}: DateRangePickerProps) {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(
    value?.from || value?.to
      ? {
          from: value?.from,
          to: value?.to,
        }
      : undefined
  );
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (value?.from || value?.to) {
      setDateRange({
        from: value.from,
        to: value.to,
      });
    } else {
      setDateRange(undefined);
    }
  }, [value]);

  const handleSelect = (range: DateRange | undefined) => {
    setDateRange(range);
    if (onChange) {
      onChange({
        from: range?.from,
        to: range?.to,
      });
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 justify-start text-left font-normal border border-[#C8CDD2]",
            !dateRange && "text-[#B6BDC3]",
            className
          )}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dateRange?.from ? (
            dateRange.to ? (
              <>
                {format(dateRange.from, "dd.MM.yyyy", { locale: uk })} -{" "}
                {format(dateRange.to, "dd.MM.yyyy", { locale: uk })}
              </>
            ) : (
              format(dateRange.from, "dd.MM.yyyy", { locale: uk })
            )
          ) : (
            <span className="text-[#B6BDC3]">{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          defaultMonth={dateRange?.from}
          selected={dateRange}
          onSelect={handleSelect}
          numberOfMonths={2}
          className="rounded-lg border shadow-sm"
        />
      </PopoverContent>
    </Popover>
  );
}
