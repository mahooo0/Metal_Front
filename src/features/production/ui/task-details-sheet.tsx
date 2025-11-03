"use client";

import React, { useState } from "react";

import Image from "next/image";

import Application from "@/public/aplication.svg";
import {
  ChevronUp,
  CirclePlayIcon,
  CircleStopIcon,
  Clock9Icon,
  StarIcon,
  User2Icon,
} from "lucide-react";

import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/shared/ui/sheet";
import { Textarea } from "@/shared/ui/textarea";

import type { AllTasksItem } from "../types/all-tasks.types";
import type { ProductionItem } from "../types/production.types";

interface TaskDetailsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  task: AllTasksItem | ProductionItem | null;
  onSave?: (data: TaskDetailsData) => void;
  onCancel?: () => void;
}

export interface TaskDetailsData {
  totalTime: {
    hours: string;
    minutes: string;
    seconds: string;
  };
  type: string;
  comment: string;
}

export default function TaskDetailsSheet({
  isOpen,
  onClose,
  task,
  onSave,
  onCancel,
}: TaskDetailsSheetProps) {
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("57");
  const [seconds, setSeconds] = useState("11");
  const [type, setType] = useState("");
  const [comment, setComment] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleSave = () => {
    if (onSave) {
      onSave({
        totalTime: { hours, minutes, seconds },
        type,
        comment,
      });
    }
    onClose();
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    onClose();
  };

  if (!task) {
    return null;
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[800px] sm:max-w-[800px] overflow-y-auto">
        <SheetHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="flex items-center gap-2">
              ← Назад
            </Button>

            <Button
              variant="blue"
              size="lg"
              className="h-[42px]"
              onClick={handleSave}>
              Переглянути замовлення
            </Button>
          </div>
        </SheetHeader>
        <div className="px-6 flex flex-col gap-6">
          <div className="flex  justify-between items-center">
            <div className="flex items-center gap-2">
              <Image src={Application.src} alt="logo" width={36} height={36} />
              <h4 className="text-[24px] font-bold text-[#3A4754]">
                ТОВ “Базис”
              </h4>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm text-[#6D7A87] ">Номер замовлення:</p>
              <p className="text-sm text-[#6D7A87] font-bold">44-08-IK-SR-An</p>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center gap-4">
            <button className="w-1/3 h-[90px] bg-[#1D96F9] rounded-lg flex items-center justify-center">
              <CirclePlayIcon size={40} color="#ffffff" />
            </button>
            <button
              disabled
              className={cn(
                "w-1/3 h-[90px] bg-[#1D96F9] rounded-lg flex items-center justify-center",
                "disabled:bg-[#A4D5FD] disabled:opacity-50"
              )}>
              <Clock9Icon size={40} color="#ffffff" />
            </button>
            <button
              disabled
              className={cn(
                "w-1/3 h-[90px] bg-[#1D96F9] rounded-lg flex items-center justify-center",
                "disabled:bg-[#A4D5FD] disabled:opacity-50"
              )}>
              <CircleStopIcon size={40} color="#ffffff" />
            </button>
          </div>
          <div className="mt-6 space-y-6 max-w-[470px]">
            {/* Time displayer */}
            <div className="bg-[#D8F6FE] rounded-lg p-6">
              <div className="flex items-center justify-center gap-4">
                <div className="w-1/3 h-[53px] text-center text-[28px] font-bold bg-white border border-[#C8CDD2] rounded-[16px] flex items-center justify-center text-[#6D7A87] ">
                  {hours}
                </div>
                <span className="text-[28px] font-bold text-gray-400">:</span>
                <div className="w-1/3 h-[53px]   text-center text-[28px] font-bold bg-white border border-[#C8CDD2] rounded-[16px] flex items-center justify-center text-[#6D7A87] ">
                  {minutes}
                </div>
                <span className="text-[28px] font-bold text-gray-400">:</span>
                <div className="w-1/3 h-[53px] text-center text-[28px] font-bold bg-white border border-[#C8CDD2] rounded-[16px] flex items-center justify-center text-[#6D7A87] ">
                  {seconds}
                </div>
              </div>
            </div>

            {/* Type select */}
            <div className="space-y-2">
              <Label
                htmlFor="type"
                className="text-sm text-[#3A4754] font-medium">
                Тип
              </Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger
                  id="type"
                  className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
                  <SelectValue placeholder="input_label" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="type1">Тип 1</SelectItem>
                  <SelectItem value="type2">Тип 2</SelectItem>
                  <SelectItem value="type3">Тип 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Comment textarea */}
            <div className="space-y-2">
              <Label
                htmlFor="comment"
                className="text-sm text-[#3A4754] font-medium">
                Коментар
              </Label>
              <Textarea
                id="comment"
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="text_area"
                className="min-h-[120px] w-full rounded-[16px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm resize-none"
              />
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-4 pt-4">
              <Button
                variant="outline"
                size="lg"
                onClick={handleCancel}
                className="flex-1 h-12 bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50">
                Відмінити
              </Button>
              <Button
                variant="default"
                size="lg"
                onClick={handleSave}
                className="flex-1 h-12 bg-gray-800 hover:bg-gray-700 text-white">
                Зберегти
              </Button>
            </div>
          </div>
          {/* History section */}
          <div className="border-t pt-6">
            <h3 className="text-[20px] font-bold mb-5 text-[#3A4754]">
              Історія виконання
            </h3>
            <div className="flex flex-col gap-5">
              {[1, 2, 3, 4, 5].map(index => (
                <div key={index} className="flex gap-4   rounded-lg">
                  <div className="flex  gap-2 text-gray-500 min-w-[120px]">
                    <div className="flex items-center h-fit gap-1">
                      <div className="w-[50px] h-[42px] text-center text-[20px] font-bold bg-[#F6F6F6] rounded flex items-center justify-center text-[#6D7A87] ">
                        00
                      </div>
                      <span className="text-[20px] font-bold text-[#6D7A87]">
                        :
                      </span>
                      <div className="w-[50px] h-[42px] text-center text-[20px] font-bold bg-[#F6F6F6] rounded flex items-center justify-center text-[#6D7A87] ">
                        57
                      </div>
                      <span className="text-[20px] font-bold text-[#6D7A87]">
                        :
                      </span>
                      <div className="w-[50px] h-[42px] text-center text-[20px] font-bold bg-[#F6F6F6] rounded flex items-center justify-center text-[#6D7A87] ">
                        11
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm mb-1 text-[#3A4754]">
                      Поставлено на паузу
                    </div>
                    <p className="font-medium text-sm  text-[#6D7A87]">
                      Lorem ipsum dolor sit amet consectetur. Faucibus id dui at
                      nulla. Ut praesent semper cursus nec vitae semper.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
