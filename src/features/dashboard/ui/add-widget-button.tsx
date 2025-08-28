import React from "react";

import { PlusIcon } from "lucide-react";

import { Button } from "@/shared/ui/button";

export default function AddWidgetButton() {
  return (
    <Button
      variant="ghost"
      className="flex flex-col items-center gap-3 !bg-[#FCFCFC] hover:bg-[#FCFCFC] p-0 w-full h-full !cursor-pointer hover:text-[#1D96F9] transition-all duration-300">
      <span className=" w-[72px] h-[72px] flex items-center justify-center rounded-full  border border-[#F0F0F0] group-hover:border-[#1D96F9] transition-all duration-300">
        <PlusIcon className="w-4 h-4 text-[#929BA5] group-hover:text-[#1D96F9] transition-all duration-300 group-hover:rotate-45" />
      </span>
      <span className="text-sm font-normal text-[#929BA5]">додати віджет</span>
    </Button>
  );
}
