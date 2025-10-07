import React from "react";

import { ChevronDown } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Label,
} from "@/shared/ui";
import { Checkbox } from "@/shared/ui/checkbox";

export default function AnalyticsFilter() {
  return (
    <div className="bg-white rounded-[16px]  px-3 ">
      <Accordion type="single" collapsible>
        <AccordionItem value="filter" className="p-0">
          <AccordionTrigger
            showIcon={false}
            className="group hover:no-underline cursor-pointer">
            <div className="flex items-center justify-between border-b border-[#DBDEE1] pb-4 w-full">
              <h2 className="text-[3A4754] text-[16px] font-bold  direction-none ">
                Фільтр
              </h2>
              <Button
                className=" bg-[#495969] w-6 h-6 flex items-center justify-center"
                size="icon">
                <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </Button>
            </div>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-3 py-3">
            <div className="flex items-center gap-2">
              <Checkbox className="w-5 h-5" />
              <Label className="text-[#3A4754] text-[12px] font-medium">
                Lorem ipsum libero
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox className="w-5 h-5" />
              <Label className="text-[#3A4754] text-[12px] font-medium">
                Lorem ipsum libero
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox className="w-5 h-5" />
              <Label className="text-[#3A4754] text-[12px] font-medium">
                Lorem ipsum libero
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox className="w-5 h-5" />
              <Label className="text-[#3A4754] text-[12px] font-medium">
                Lorem ipsum libero
              </Label>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
