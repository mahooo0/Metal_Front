import React from "react";

import { ArrowDown } from "lucide-react";

import coin from "../../../public/coin.svg";

export default function TotalFinanceCard() {
  return (
    <div className=" p-3 bg-white rounded-lg border ">
      <p className="text-[18px] text-[#3A4754] font-bold mb-3">ТОВ “Базис”</p>
      <div className="flex flex-row gap-2 items-center mb-1">
        <img src={coin.src} alt="" width={24} height={24} />
        <p className="text-[32px] text-[#3A4754] font-bold">80678 грн</p>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <ArrowDown className="w-4 h-4 rotate-180 text-[#64C4AA]" />
        <p>
          {" "}
          <span className="text-[#64C4AA]">+3,0%</span> за останній місяць
        </p>
      </div>
      <div className="flex  gap-2 mt-[28px]">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 rounded-full border border-[#8AE4FD] flex items-center justify-center">
            <div className="w-[9px] h-[9px] rounded-full bg-[#8AE4FD]"></div>
          </div>
          <span className="text-sm text-[#3A4754]">Lorem ipsum</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 rounded-full border border-[#1D96F9] flex items-center justify-center">
            <div className="w-[9px] h-[9px] rounded-full bg-[#1D96F9]"></div>
          </div>
          <span className="text-sm text-[#3A4754]">Lorem ipsum</span>
        </div>
      </div>
      <div className="mt-5 w-full bg-[#F6F6F6] rounded-xl flex flex-col p-1 gap-1 mb-1">
        <div className="rounded-lg bg-[#8AE4FD] h-[32px] w-[80%]"></div>
        <div className="rounded-lg bg-[#1D96F9] h-[32px] w-[100%]"></div>
      </div>
    </div>
  );
}
