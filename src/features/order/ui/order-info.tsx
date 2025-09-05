"use client";

import React, { useState } from "react";

import NeqrVockax from "@/public/neqr_s_ockami.png";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronDown,
  ChevronUp,
  Clock,
  Edit,
  Ellipsis,
  FileText,
  List,
  Send,
  Upload,
  X,
} from "lucide-react";

import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Input } from "@/shared/ui/input";

export default function OrderInfo() {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <div className="bg-white w-full h-fit rounded-2xl py-5 px-4 ">
      <div className="flex items-center justify-between">
        <h2 className="text-[24px] font-bold text-[#3A4754]">
          Замовлення 44-08-IK-SR-An{" "}
        </h2>
        <div className="flex items-center gap-2">
          <p className="text-sm text-[#6D7A87]">Створено 25/08/2025</p>
          <Button
            variant="ghost"
            size="icon"
            className="bg-white w-[36px] h-[36px] rounded-full border border-[#B6BDC3] text-[#495969]">
            <Ellipsis size={20} />
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between mt-5">
        <div className=" flex  items-center gap-2">
          <p className="text-xs text-[#3A4754]">Статус:</p>
          <div className="bg-[#D3CEFB] rounded-2xl py-1 px-3">
            <p className="text-xs text-[#6C5BF2]">Завершення</p>
          </div>
        </div>
        <div className="text-[#6D7A87] flex">
          <Button variant="ghost" className="bg-white  text-[#495969]">
            <div className="flex items-center justify-center w-4 h-4 border-2 border-[#6D7A87] p-0.5 rounded-full">
              <ArrowLeft className="!w-[10px] !h-[10px] max-w-[10px] " />
            </div>
            <p className="text-[10px]">попередній</p>
          </Button>
          <Button variant="ghost" className="bg-white text-[#495969]">
            {" "}
            <p className="text-[10px]">наступний</p>
            <div className="flex items-center justify-center w-4 h-4 border-2 border-[#6D7A87] p-0.5 rounded-full">
              <ArrowRight className="!w-[10px] !h-[10px] max-w-[10px] " />
            </div>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="bg-white text-[#495969]">
                <p className="text-[10px]">обрати зі списку</p>
                <div className="flex items-center justify-center w-4 h-4 border-2 border-[#6D7A87] p-0.5 rounded-full">
                  <List className="!w-[10px] !h-[10px] max-w-[10px]" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Активні замовлення</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <span>В процесі</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span>Завершені</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span>Скасовані</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex flex-row gap-[36px] mt-5">
        <div className="flex flex-row justify-center gap-2">
          <img
            src={NeqrVockax.src}
            alt=""
            className="w-[36px] h-[36px] rounded-full object-cover"
          />
          <div className="flex flex-col gap-1">
            <h4 className="text-sm text-[#3A4754]">Ковальчук А.В.</h4>
            <p className="text-[#6D7A87] text-xs">менеджер</p>
          </div>
        </div>
        <div className="flex flex-row justify-center gap-2">
          <img
            src={NeqrVockax.src}
            alt=""
            className="w-[36px] h-[36px] rounded-full object-cover"
          />
          <div className="flex flex-col gap-1">
            <h4 className="text-sm text-[#3A4754]">Ковальчук А.В.</h4>
            <p className="text-[#6D7A87] text-xs">менеджер</p>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div className="flex items-center  mb-5 gap-[32px]">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#6D7A87]" />
            <p className="text-sm text-[#6D7A87]">Початок прорахунку</p>
            <span className="text-sm  text-[#3A4754]">15/08/2025</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#6D7A87]" />
            <p className="text-sm text-[#6D7A87]">Дата видачі</p>
            <span className="text-sm  text-[#3A4754]">25/08/2025</span>
          </div>
        </div>

        <div className="">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold text-[#3A4754]">Опис</h3>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 rounded-full bg-white border border-[#B6BDC3] text-[#495969] hover:bg-gray-50">
              <Edit className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-sm text-[#6D7A87] leading-relaxed max-w-[680px] line-clamp-4">
            Lorem ipsum dolor sit amet consectetur. Eget sed netus ultrices
            pellentesque et lectus. Mauris faucibus malesuada maecenas
            tincidunt. In sed volutpat malesuada id dictum vehicula malesuada.
            Maecenas ut libero scelerisque lectus erat. Ultrices pretium mauris
            sit cras. Sed sit orci imperdiet faucibus mattis viverr
          </p>
        </div>
      </div>
      <div className="mt-5">
        <div className="border-none">
          <div className="text-lg font-semibold text-[#3A4754] py-2">
            <div className="flex items-center justify-between w-full">
              <span>Документи</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 rounded-full bg-white border border-[#B6BDC3] text-[#495969] hover:bg-gray-50">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleAccordion}
                  className="w-8 h-8 rounded-full bg-[#3A4754] hover:bg-[#2C3748] flex items-center justify-center">
                  {isAccordionOpen ? (
                    <ChevronUp className="w-4 h-4 text-white" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-white" />
                  )}
                </Button>
              </div>
            </div>
          </div>
          {isAccordionOpen && (
            <div className="space-y-4">
              {/* Tabs */}
              <div className="flex space-x-6 border-b border-gray-200">
                {[
                  "Lorem ipsum",
                  "Lorem ipsum",
                  "Lorem ipsum",
                  "Lorem ipsum",
                  "Lorem ipsum",
                ].map((tab, index) => (
                  <button
                    key={index}
                    className={`pb-2 text-sm font-medium transition-colors ${
                      index === 0
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}>
                    {tab}
                  </button>
                ))}
              </div>

              {/* Document Thumbnails */}
              <div className="flex gap-4">
                {Array.from({ length: 6 }, (_, index) => (
                  <div
                    key={index}
                    className={`relative cursor-pointer rounded-lg w-fit `}>
                    <button className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center">
                      <X className="w-3 h-3 text-gray-600" />
                    </button>
                    <div
                      className={cn(
                        "w-[76px] h-[76px] bg-white rounded border border-gray-200 flex items-center justify-center",
                        index === 0 && "border-blue-300 bg-blue-50"
                      )}>
                      <FileText className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Contract.png
                    </p>
                  </div>
                ))}
              </div>

              {/* Add File Button */}
              <Button variant="blue" size={"lg"} className="rounded-[48px]">
                <Upload className="w-4 h-4 mr-2" />
                Додати файл
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-5 max-w-[680px]">
        <div className="space-y-4">
          {/* Comment Input Section */}
          <div className="space-y-2 ">
            <label className="text-sm font-medium text-[#3A4754]">
              Ваш коментар
            </label>
            <div className="flex gap-3 mt-1">
              <Input
                type="text"
                placeholder="input_label"
                className="bg-white"
              />

              <Button
                variant="blue"
                size={"lg"}
                className="rounded-[48px] h-[48px]">
                <Send className="w-4 h-4 mr-2" />
                Надіслати
              </Button>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-4 mt-4">
            {/* First Comment */}
            <div className="flex gap-3">
              <img
                src={NeqrVockax.src}
                alt="Henry Arthur"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-[#3A4754]">
                    Henry Arthur
                  </span>
                  <span className="text-xs text-[#6D7A87]">3 години тому</span>
                </div>
                <p className="text-sm text-[#3A4754] leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur. Eget sed netus
                  ultrices pellentesque et lectus. Mauris faucibus malesuada
                  maecenas tincidunt. In sed volutpat malesuada id dictum
                  vehicula malesuada. Maecenas ut libero scelerisque lectus
                  erat. Ultrices pretium mauris sit cras. Sed...
                </p>
              </div>
            </div>

            {/* Date Separator */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-2 text-[#6D7A87]">Вчора</span>
              </div>
            </div>

            {/* Second Comment */}
            <div className="flex gap-3">
              <img
                src={NeqrVockax.src}
                alt="Henry Arthur"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-[#3A4754]">
                    Henry Arthur
                  </span>
                  <span className="text-xs text-[#6D7A87]">3 години тому</span>
                </div>
                <p className="text-sm text-[#3A4754] leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur. Eget sed netus
                  ultrices pellentesque et lectus. Mauris faucibus malesuada
                  maecenas tincidunt. In sed volutpat malesuada id dictum
                  vehicula malesuada. Maecenas ut libero scelerisque lectus
                  erat. Ultrices pretium mauris sit cras. Sed...
                </p>
              </div>
            </div>

            {/* Third Comment */}
            <div className="flex gap-3">
              <img
                src={NeqrVockax.src}
                alt="Henry Arthur"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-[#3A4754]">
                    Henry Arthur
                  </span>
                  <span className="text-xs text-[#6D7A87]">3 години тому</span>
                </div>
                <p className="text-sm text-[#3A4754] leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur. Eget sed netus
                  ultrices pellentesque et lectus. Mauris faucibus malesuada
                  maecenas tincidunt. In sed volutpat malesuada id dictum
                  vehicula malesuada. Maecenas ut libero scelerisque lectus
                  erat. Ultrices pretium mauris sit cras. Sed...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
