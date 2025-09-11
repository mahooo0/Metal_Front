import React from "react";

import Image from "next/image";

import { Separator } from "@radix-ui/react-separator";
import { ChevronDown, Clock, Download, RefreshCw, Upload } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

export default function ResultsPanel() {
  return (
    <div className="bg-white rounded-lg  mt-5 pb-9">
      {/* Header with title and controls */}
      <div className="flex items-center justify-between p-4">
        <div className="flex flex-col w-fit justify-between gap-10">
          <h2 className="text-[32px] font-bold text-[#3A4754]">Результати</h2>
        </div>

        {/* Time Boxes */}
      </div>

      {/* Main Content */}
      <div className=" grid grid-cols-12 gap-6 px-5 h-[180px]">
        <div className="col-span-6  bg-[#EBFBFF] rounded-lg flex flex-col justify-center p-4 ">
          <div className="flex items-center gap-3 mb-4">
            <Image
              src="/comment-icon.svg"
              alt="Comment icon"
              width={24}
              height={24}
            />
            <h4 className="text-[18px] text-[#3A4754] font-medium">Коментар</h4>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Image
                src="/process-icon.svg"
                alt="Process icon"
                width={20}
                height={20}
              />
              <p className="text-sm text-[#6D7A87]">Націнка на порізку:</p>
              <p className="text-[14px] text-[#3A4754] font-medium">105,6</p>
            </div>

            <div className="flex items-center gap-2">
              <Image
                src="/additional-works-icon.svg"
                alt="Additional works icon"
                width={20}
                height={20}
              />
              <p className="text-sm text-[#6D7A87]">Додаткові роботи:</p>
              <p className="text-[14px] text-[#3A4754] font-medium">
                5000 грн (без націнки-2200 грн)
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Image
                src="/total-cost-icon.svg"
                alt="Total cost icon"
                width={20}
                height={20}
              />
              <p className="text-sm text-[#6D7A87]">Загальна вартість:</p>
              <p className="text-[14px] text-[#3A4754] font-medium">
                147888 грн
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[#EBFBFF] rounded-lg p-4 py-3 flex items-center gap-3 col-span-3 ">
          <div>
            <div className="text-sm text-[#3A4754] font-medium flex items-center gap-2 min-w-[300px]">
              <Clock className="h-5 w-5 text-[#3A4754]" />
              <p className="text-[18px] text-[#3A4754] font-medium">
                Фактичний час прорахунку
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 mt-3">
              <div className="bg-[#FFFFFF] h-[53px] w-[72px] text-[#6D7A87] text-[28px] font-bold flex items-center justify-center px-2 py-1 rounded-[18px]">
                03
              </div>
              <span className="text-[#929BA5] text-[28px] font-bold">:</span>
              <div className="bg-[#FFFFFF] h-[53px] w-[72px] text-[#6D7A87] text-[28px] font-bold flex items-center justify-center px-2 py-1 rounded-[18px]">
                56
              </div>
              <span className="text-[#929BA5] text-[28px] font-bold">:</span>
              <div className="bg-[#FFFFFF] h-[53px] w-[72px] text-[#6D7A87] text-[28px] font-bold flex items-center justify-center px-2 py-1 rounded-[18px]">
                23
              </div>
            </div>
          </div>
        </div>

        {/* Approximate Cutting Time */}
        <div className="bg-[#EBFBFF] rounded-lg p-4 py-3 flex items-center gap-3 col-span-3">
          <div>
            <div className="text-sm text-[#3A4754] font-medium flex items-center gap-2 min-w-[300px]">
              <Clock className="h-5 w-5 text-[#3A4754]" />
              <p className="text-[18px] text-[#3A4754] font-medium">
                Приблизний час порізки
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 mt-3">
              <div className="bg-[#FFFFFF] h-[53px] w-[72px] text-[#6D7A87] text-[28px] font-bold flex items-center justify-center px-2 py-1 rounded-[18px]">
                00
              </div>
              <span className="text-[#929BA5] text-[28px] font-bold">:</span>
              <div className="bg-[#FFFFFF] h-[53px] w-[72px] text-[#6D7A87] text-[28px] font-bold flex items-center justify-center px-2 py-1 rounded-[18px]">
                57
              </div>
              <span className="text-[#929BA5] text-[28px] font-bold">:</span>
              <div className="bg-[#FFFFFF] h-[53px] w-[72px] text-[#6D7A87] text-[28px] font-bold flex items-center justify-center px-2 py-1 rounded-[18px]">
                11
              </div>
            </div>
          </div>
        </div>
      </div>
      <Separator color="#DBDEE1" className="my-6" />
      <div className="grid grid-cols-3 gap-6 px-5">
        {/* Left Column - Parts Metrics */}
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-white rounded-lg  gap-2">
            <span className="text-[#6D7A87] text-sm bg-[#F6F6F6] py-3 px-4 w-full rounded-lg">
              <p className="text-[#3A4754] text-sm">Кількість деталей, шт</p>
            </span>
            <span className="text-[#3A4754] bg-[#EBFBFF] py-3 px-4 w-[100px] text-sm text-center rounded-lg ">
              <p className="text-sm ">43555</p>
            </span>
          </div>
          <div className="flex justify-between items-center bg-white rounded-lg gap-2">
            <span className="text-[#6D7A87] text-sm bg-[#F6F6F6] py-3 px-4 w-full rounded-lg">
              <p className="text-[#3A4754] text-sm">Довжина різу</p>
            </span>
            <span className="text-[#3A4754] bg-[#EBFBFF] py-3    w-[100px] text-sm text-center rounded-lg ">
              <p className="text-sm">1450089</p>
            </span>
          </div>
          <div className="flex justify-between items-center bg-white rounded-lg gap-2">
            <span className="text-[#6D7A87] text-sm bg-[#F6F6F6] py-3 px-4 w-full rounded-lg">
              <p className="text-[#3A4754] text-sm">Точки врізу</p>
            </span>
            <span className="text-[#3A4754] bg-[#EBFBFF] py-3 w-[100px] text-sm text-center rounded-lg ">
              <p className="text-sm">67</p>
            </span>
          </div>
          <div className="flex justify-between items-center bg-white rounded-lg gap-2">
            <span className="text-[#6D7A87] text-sm bg-[#F6F6F6] py-3 px-4 w-full rounded-lg">
              <p className="text-[#3A4754] text-sm">Довжина різу+тв</p>
            </span>
            <span className="text-[#3A4754] bg-[#EBFBFF] py-3 w-[100px] text-sm text-center rounded-lg ">
              <p className="text-sm">9642</p>
            </span>
          </div>
          <div className="flex justify-between items-center bg-white rounded-lg gap-2">
            <span className="text-[#6D7A87] text-sm bg-[#F6F6F6] py-3 px-4 w-full rounded-lg">
              <p className="text-[#3A4754] text-sm">
                Розрахункова вага деталей
              </p>
            </span>
            <span className="text-[#3A4754] bg-[#EBFBFF] py-3 w-[100px] text-sm text-center rounded-lg ">
              <p className="text-sm">567</p>
            </span>
          </div>
          <div className="flex justify-between items-center bg-white rounded-lg gap-2">
            <span className="text-[#6D7A87] text-sm bg-[#F6F6F6] py-3 px-4 w-full rounded-lg">
              <p className="text-[#3A4754] text-sm">Всього згинів</p>
            </span>
            <span className="text-[#3A4754] bg-[#EBFBFF] py-3 w-[100px] text-sm text-center rounded-lg ">
              <p className="text-sm">282</p>
            </span>
          </div>
        </div>

        {/* Middle Column - Sums */}
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-white rounded-lg gap-2">
            <span className="text-[#6D7A87] text-sm bg-[#F6F6F6] py-3 px-4 w-full rounded-lg">
              <p className="text-[#3A4754] text-sm">Сума згинання</p>
            </span>
            <span className="text-[#3A4754] bg-[#EBFBFF] py-3 w-[100px] text-sm text-center rounded-lg ">
              <p className="text-sm">572934</p>
            </span>
          </div>
          <div className="flex justify-between items-center bg-white rounded-lg gap-2">
            <span className="text-[#6D7A87] text-sm bg-[#F6F6F6] py-3 px-4 w-full rounded-lg">
              <p className="text-[#3A4754] text-sm">Сума порізки</p>
            </span>
            <span className="text-[#3A4754] bg-[#EBFBFF] py-3 w-[100px] text-sm text-center rounded-lg ">
              <p className="text-sm">978615</p>
            </span>
          </div>
          <div className="flex justify-between items-center bg-white rounded-lg gap-2">
            <span className="text-[#6D7A87] text-sm bg-[#F6F6F6] py-3 px-4 w-full rounded-lg">
              <p className="text-[#3A4754] text-sm">Сума металу</p>
            </span>
            <span className="text-[#3A4754] bg-[#EBFBFF] py-3 w-[100px] text-sm text-center rounded-lg ">
              <p className="text-sm">468990</p>
            </span>
          </div>
          <div className="flex justify-between items-center bg-white rounded-lg gap-2 border-t pt-3">
            <span className="text-[#6D7A87] text-sm bg-[#F6F6F6] py-3 px-4 w-full rounded-lg">
              <p className="text-[#3A4754] text-sm font-semibold">
                Сума всього
              </p>
            </span>
            <span className="text-[#3A4754] bg-[#EBFBFF] py-3 w-[100px] text-sm text-center rounded-lg  text-lg">
              <p className="text-sm">1 699 765</p>
            </span>
          </div>
        </div>

        {/* Right Column - Discount and Markup */}
        <div className="space-y-6">
          {/* Discount Section */}
          <div className="space-y-4">
            <h3 className="text-[#6D7A87] font-semibold text-sm">Знижка</h3>
            <div className=" flex flex-col gap-3">
              <div className="flex items-center gap-2 ">
                <div className="flex  gap-2 w-1/2 flex-col">
                  <div className="flex items-center space-x-2 ">
                    <Checkbox id="bending-discount" defaultChecked />
                    <label
                      htmlFor="bending-discount"
                      className="text-[#6D7A87] text-sm">
                      Гнуття
                    </label>
                  </div>
                  <span className="text-[#6D7A87] text-sm bg-[#F6F6F6] py-3 px-4 w-full rounded-lg">
                    <p className="text-[#3A4754] text-sm">1856</p>
                  </span>
                </div>{" "}
                <div className="flex  gap-2 w-1/2 flex-col">
                  <div className="flex items-center space-x-2 ">
                    <Checkbox id="bending-discount" defaultChecked />
                    <label
                      htmlFor="bending-discount"
                      className="text-[#6D7A87] text-sm">
                      Порізка
                    </label>
                  </div>
                  <span className="text-[#6D7A87] text-sm bg-[#F6F6F6] py-3 px-4 w-full rounded-lg">
                    <p className="text-[#3A4754] text-sm">1856</p>
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center bg-white rounded-lg gap-2">
                <span className="text-[#6D7A87] text-sm bg-[#EBFBFF] py-3 px-4 w-full rounded-lg">
                  <p className="text-[#3A4754] text-sm">Сума зі знижкою</p>
                </span>
                <span className="text-[#3A4754] bg-[#EBFBFF] py-3 w-[100px] text-sm text-center rounded-lg ">
                  <p className="text-sm">4689025</p>
                </span>
              </div>
            </div>
          </div>

          {/* Markup Section */}
          <div className="space-y-4">
            <h3 className="text-[#6D7A87] font-semibold text-sm">Націнка</h3>
            <div className=" flex flex-col gap-3">
              <div className="flex items-center gap-2 ">
                <div className="flex  gap-2 w-1/2 flex-col">
                  <div className="flex items-center space-x-2 ">
                    <Checkbox id="bending-discount" defaultChecked />
                    <label
                      htmlFor="bending-discount"
                      className="text-[#6D7A87] text-sm">
                      Гнуття
                    </label>
                  </div>
                  <span className="text-[#6D7A87] text-sm bg-[#F6F6F6] py-3 px-4 w-full rounded-lg">
                    <p className="text-[#3A4754] text-sm">1856</p>
                  </span>
                </div>{" "}
                <div className="flex  gap-2 w-1/2 flex-col">
                  <div className="flex items-center space-x-2 ">
                    <Checkbox id="bending-discount" defaultChecked />
                    <label
                      htmlFor="bending-discount"
                      className="text-[#6D7A87] text-sm">
                      Порізка
                    </label>
                  </div>
                  <span className="text-[#6D7A87] text-sm bg-[#F6F6F6] py-3 px-4 w-full rounded-lg">
                    <p className="text-[#3A4754] text-sm">1856</p>
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center bg-white rounded-lg gap-2">
                <span className="text-[#6D7A87] text-sm bg-[#EBFBFF] py-3 px-4 w-full rounded-lg">
                  <p className="text-[#3A4754] text-sm">Сума зі знижкою</p>
                </span>
                <span className="text-[#3A4754] bg-[#EBFBFF] py-3 w-[100px] text-sm text-center rounded-lg ">
                  <p className="text-sm">4689025</p>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
