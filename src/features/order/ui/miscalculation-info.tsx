import React from "react";

import { Ellipsis, MessageCircle, MoreHorizontal } from "lucide-react";

import { Button } from "@/shared/ui";

export default function MiscalculationInfo() {
  return (
    <div className="bg-white w-full h-fit rounded-2xl pt-5 pr-[26px] pb-5 pl-[26px] opacity-100">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M21.3333 13H10.6667C9.74667 13 9 13.7467 9 14.6667V16.0667C9.04 16.0533 9.06667 16.04 9.10667 16.0267C9.26667 15.9467 9.44 15.8933 9.61333 15.84C9.69333 15.8133 9.77333 15.7867 9.86667 15.76C10.1333 15.7067 10.4 15.6667 10.68 15.6667H21.3467C21.6267 15.6667 21.8933 15.7067 22.16 15.76C22.24 15.7733 22.32 15.8133 22.4133 15.84C22.5867 15.8933 22.76 15.9467 22.92 16.0267C22.96 16.04 23 16.0533 23.0267 16.0667V14.6667C23 13.7467 22.2533 13 21.3333 13Z"
              fill="#3A4754"
            />
            <path
              d="M21.3333 17.6667H10.6667C9.74667 17.6667 9 18.4133 9 19.3333V20H12.6667C13.2133 20 13.6667 20.4533 13.6667 21C13.6667 22.28 14.72 23.3333 16 23.3333C17.28 23.3333 18.3333 22.28 18.3333 21C18.3333 20.4533 18.7867 20 19.3333 20H23V19.3333C23 18.4133 22.2533 17.6667 21.3333 17.6667Z"
              fill="#3A4754"
            />
            <path
              d="M21.3333 8.66666H10.6667C9.74667 8.66666 9 9.41332 9 10.3333V11.4133C9.50667 11.16 10.0667 11 10.6667 11H21.3333C21.9333 11 22.4933 11.16 23 11.4133V10.3333C23 9.41332 22.2533 8.66666 21.3333 8.66666Z"
              fill="#3A4754"
            />
            <path
              d="M21.586 2.66666H10.4127C5.55935 2.66666 2.66602 5.55999 2.66602 10.4133V21.5733C2.66602 26.44 5.55935 29.3333 10.4127 29.3333H21.5727C26.426 29.3333 29.3193 26.44 29.3193 21.5867V10.4133C29.3327 5.55999 26.4394 2.66666 21.586 2.66666ZM25.3327 22H23.9993H20.2127C19.7593 23.9067 18.0393 25.3333 15.9993 25.3333C13.9593 25.3333 12.2393 23.9067 11.786 22H7.99935H6.66602C6.11935 22 5.66602 21.5467 5.66602 21C5.66602 20.4533 6.11935 20 6.66602 20H6.99935V19.3333V18.6667V14.6667V10.3333C6.99935 8.30666 8.63935 6.66666 10.666 6.66666H21.3327C23.3594 6.66666 24.9993 8.30666 24.9993 10.3333V14.6667V18.6667V19.3333V20H25.3327C25.8793 20 26.3327 20.4533 26.3327 21C26.3327 21.5467 25.8793 22 25.3327 22Z"
              fill="#3A4754"
            />
          </svg>
          <h2 className="text-xl font-bold text-[#3A4754]">
            Інформація про прорахунок
          </h2>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="bg-white w-[36px] h-[36px] rounded-full border border-[#B6BDC3] text-[#495969]">
          <Ellipsis size={20} />
        </Button>{" "}
      </div>

      {/* Information Fields */}
      <div className="space-y-4">
        {/* Single Column Fields */}
        <div className="bg-[#F6F6F6] rounded-lg px-4 py-2">
          <div className="text-sm text-[#3A4754] font-medium ">
            Дата початку прорахунку:
          </div>
          <div className="text-sm  text-[#6D7A87]">10.10.2025</div>
        </div>

        <div className="bg-[#F6F6F6] rounded-lg px-4 py-2">
          <div className="text-sm text-[#3A4754] font-medium">
            Додаткові роботи:
          </div>
          <div className="text-sm text-[#6D7A87]">39876</div>
        </div>

        <div className="bg-[#F6F6F6] rounded-lg px-4 py-2">
          <div className="text-sm text-[#3A4754] font-medium">
            Наявність металу:
          </div>
          <div className="text-sm text-[#6D7A87]">Так</div>
        </div>

        {/* Two Column Fields */}
        <div className="grid grid-cols-2 gap-5">
          <div className="bg-[#F6F6F6] rounded-lg px-4 py-2">
            <div className="text-sm text-[#3A4754] font-medium">
              Розкрій лазер:
            </div>
            <div className="text-sm text-[#6D7A87]">15518</div>
          </div>
          <div className="bg-[#F6F6F6] rounded-lg px-4 py-2">
            <div className="text-sm text-[#3A4754] font-medium">
              Розкрій гідра:
            </div>
            <div className="text-sm text-[#6D7A87]">2000</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="bg-[#F6F6F6] rounded-lg px-4 py-2">
            <div className="text-sm text-[#3A4754] font-medium">Гібка:</div>
            <div className="text-sm text-[#6D7A87]">5161</div>
          </div>
          <div className="bg-[#F6F6F6] rounded-lg px-4 py-2">
            <div className="text-sm text-[#3A4754] font-medium">Метал:</div>
            <div className="text-sm text-[#6D7A87]">5161</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="bg-[#F6F6F6] rounded-lg px-4 py-2">
            <div className="text-sm text-[#3A4754] font-medium">
              Послуги конструктора:
            </div>
            <div className="text-sm text-[#6D7A87]">39876</div>
          </div>
          <div className="bg-[#F6F6F6] rounded-lg px-4 py-2">
            <div className="text-sm text-[#3A4754] font-medium">Націнка:</div>
            <div className="text-sm text-[#6D7A87]">39876</div>
          </div>
        </div>
      </div>

      {/* Total Section */}
      <div className="mt-6  bg-[#E8F4FE] rounded-lg px-4 py-2 flex flex-col gap-2">
        <div className=" rounded-lg px-4 py-2 flex justify-between items-center">
          <div className="text-sm text-[#3A4754] font-medium">Сума з ПДВ:</div>
          <div className="text-[18px] font-medium text-[#3A4754]">
            1 087 432 ₴
          </div>
        </div>
        <div className=" rounded-lg px-4 py-2 flex justify-between items-center">
          <div className="text-sm text-[#3A4754] font-medium">
            Сума рахунку з ПДВ:
          </div>
          <div className="text-[18px] font-medium text-[#3A4754]">
            1 087 432 ₴
          </div>
        </div>
      </div>
    </div>
  );
}
