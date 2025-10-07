"use client";

import React, { useState } from "react";

import NeqrVockax from "@/public/neqr_s_ockami.png";
import {
  BookOpen,
  Calendar,
  ChevronUp,
  CircleDollarSign,
  Clock,
  ListTodo,
  Pause,
  X as XCircle,
} from "lucide-react";
import { useQueryState } from "nuqs";

import { cn } from "@/shared/lib";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
} from "@/shared/ui/sheet";
import Tiptap from "@/shared/ui/tiptap";

import { FileUploadSection } from "../../order/ui/file-upload-section";

export function ViewApplicationSheet() {
  const [viewTask, setViewTask] = useQueryState("viewTask", {
    defaultValue: "false",
  });
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Sheet
      open={viewTask === "true"}
      onOpenChange={open => setViewTask(open ? "true" : "false")}>
      <SheetContent className="min-w-[850px] max-w-[850px] [&>button]:hidden px-[24px] py-[20px] overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center justify-between mb-6">
            <SheetClose asChild>
              <Button
                variant="outline"
                size="lg"
                className="shadow-none border-none gap-2">
                <XCircle className="w-4 h-4" /> Закрити
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>

        <div className="space-y-6 px-4">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#3A4754] flex items-center justify-center">
              <ListTodo className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-[28px] text-[#3A4754] font-bold">
              Перегляд заявки
            </h2>
          </div>

          {/* Task Type Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#3A4754]">Тип заявки</h3>

            {/* Creator and Responsible */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <span className="text-sm text-[#6D7A87]">Створив:</span>
                <Avatar className="w-8 h-8">
                  <AvatarImage src={NeqrVockax.src} alt="Darlene Robertson" />
                  <AvatarFallback>DR</AvatarFallback>
                </Avatar>
                <span className="text-sm text-[#3A4754]">
                  Darlene Robertson
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-[#6D7A87]">Відповідальний:</span>
                <Avatar className="w-8 h-8">
                  <AvatarImage src={NeqrVockax.src} alt="Annette Black" />
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
                <span className="text-sm text-[#3A4754]">Annette Black</span>
              </div>
            </div>

            {/* Task Details */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#6D7A87]" />
                <span className="text-sm text-[#6D7A87]">Створено</span>
                <span className="text-sm text-[#3A4754]">15/08/2017</span>
              </div>

              <div className="flex items-center gap-3">
                <CircleDollarSign className="w-5 h-5 text-[#6D7A87]" />
                <span className="text-sm text-[#6D7A87]">Сутність</span>
                <span className="text-sm text-[#3A4754]">№ заявки</span>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-[#6D7A87]" />
                <span className="text-sm text-[#6D7A87]">Дата завершення</span>
                <span className="text-sm text-[#3A4754]">15/08/2017</span>
              </div>

              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-[#6D7A87] mt-0.5" />
                <span className="text-sm text-[#6D7A87]">Опис</span>
                <p className="text-sm text-[#3A4754] flex-1">
                  Lorem ipsum dolor sit amet consectetur. Facilisi ut arcu erat
                  tortor habitant posuere.
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}

          {/* File Upload Section */}

          <FileUploadSection title="згорнути" />

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <Button variant="blue" size="lg" className="flex-1 gap-2">
              <Pause className="w-4 h-4" />
              Пауза/ Відкласти заявку
            </Button>
            <Button variant="outline" size="lg" className="flex-1 gap-2">
              <div className="w-4 h-4 rounded-sm border-2 border-current flex items-center justify-center"></div>
              Завершити заявку
            </Button>
          </div>

          {/* Comment Section */}
          <div className="space-y-4">
            <h3 className="text-base font-medium text-[#3A4754]">Коментар</h3>
            <Tiptap />
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {/* First Comment */}
            <div className="flex gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={NeqrVockax.src} alt="Henry Arthur" />
                <AvatarFallback>HA</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-[#3A4754]">
                    Henry Arthur
                  </span>
                  <span className="text-xs text-[#6D7A87]">3 hour ago</span>
                </div>
                <p className="text-sm text-[#6D7A87] leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur. Eget sed netus
                  ultrices pellentesque et lectus. Mauris faucibus malesuada
                  maecenas tincidunt. In sed volutpat malesuada id dictum
                  vehicula malesuada. Maecenas ut libero scelerisque lectus
                  erat. Ultrices pretium mauri...
                </p>
              </div>
            </div>

            {/* Date Separator */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E5E7EB]"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-3 text-[#6D7A87]">Yesterday</span>
              </div>
            </div>

            {/* Second Comment */}
            <div className="flex gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={NeqrVockax.src} alt="Henry Arthur" />
                <AvatarFallback>HA</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-[#3A4754]">
                    Henry Arthur
                  </span>
                  <span className="text-xs text-[#6D7A87]">3 hour ago</span>
                </div>
                <p className="text-sm text-[#6D7A87] leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur. Eget sed netus
                  ultrices pellentesque et lectus. Mauris faucibus malesuada
                  maecenas tincidunt. In sed volutpat malesuada id dictum
                  vehicula malesuada. Maecenas ut libero scelerisque lectus
                  erat. Ultrices pretium mauri...
                </p>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
