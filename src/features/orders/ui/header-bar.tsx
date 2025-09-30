"use client";

import React from "react";

import Image from "next/image";

import { ChevronDown } from "lucide-react";
import { useQueryState } from "nuqs";

import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

export default function HeaderBar() {
  const [table, setTable] = useQueryState("table", {
    defaultValue: "laser",
  });
  return (
    <div className="flex items-center justify-between w-full mt-5 bg-white rounded-2xl p-4">
      <div className="flex items-center text-[#3A4754] gap-2">
        <span className="text-[18px] font-regular">Замовник:</span>
        <span className="font-bold text-[28px]">ТОВ Базис</span>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild onClick={e => e.stopPropagation()}>
          <Button variant="balck" className="w-[160px] rounded-[24px]">
            <Image
              src="/laser-icon.svg"
              alt="Лазер"
              width={16}
              height={16}
              className="h-4 w-4 "
            />
            {table === "laser" && "Лазер"}
            {table === "bending" && "Гнуття"}
            {table === "hydraulic" && "Гідра"}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => setTable("laser")}>
            Лазер
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTable("bending")}>
            Гнуття
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTable("hydraulic")}>
            Гідра
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
