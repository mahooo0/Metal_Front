import React from "react";

import { ArrowDown } from "lucide-react";

import { cn } from "@/shared/lib";

interface FinanceCardProps {
  icon: string;
  title: string;
  amount: string;
  percentage: string;
  isUp: boolean;
}
export default function FinanceCard({
  icon,
  title,
  amount,
  percentage,
  isUp,
}: FinanceCardProps) {
  return (
    <div className=" py-3 px-4 bg-white rounded-lg border ">
      <div className="flex flex-row gap-2 items-center  ">
        <img src={icon} alt="" width={32} height={32} />
        <p className="text-[18px] text-[#3A4754] font-bold ">{title}</p>
      </div>
      <div className="flex flex-row gap-2 items-center mb-1">
        <p className="text-[32px] text-[#3A4754] font-bold">{amount}</p>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <ArrowDown
          className={cn(
            "w-4 h-4  ",
            isUp ? "text-[#EE8BF8]" : "text-[#64C4AA] rotate-180"
          )}
        />
        <p>
          <span className={cn(!isUp ? "text-[#64C4AA]" : "text-[#EE8BF8]")}>
            {percentage}
          </span>{" "}
          за останній місяць
        </p>
      </div>
    </div>
  );
}
