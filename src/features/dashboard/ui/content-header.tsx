import React from "react";

import { Upload } from "lucide-react";

import { DatePicker } from "@/shared/ui/date-picked";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select
} from "@/shared/ui/select";

export default function ContentHeader() {
  return (
    <div className="flex flex-row justify-between">
      <div>
        <h1 className="text-[#3A4754] text-[24px] font-[700]">Привіт👋</h1>
        <p className="text-[#6D7A87] text-[16px] font-[500]">
          Налаштуй свій робочий простір
        </p>
      </div>
      <div className="flex flex-row gap-4 items-center">
        <p className="text-[#6D7A87] text-[14px] font-[500]">Обрати дату</p>
        <DatePicker className="rounded-full" />
        <Select>
          <SelectTrigger className="w-[180px] bg-white border border-gray-200 rounded-full flex items-center gap-2">
            <Upload className="w-4 h-4 text-gray-600" />
            <SelectValue placeholder="Експорт" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="export">Експорт</SelectItem>
            <SelectItem value="pdf">Експорт в PDF</SelectItem>
            <SelectItem value="excel">Експорт в Excel</SelectItem>
            <SelectItem value="csv">Експорт в CSV</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
