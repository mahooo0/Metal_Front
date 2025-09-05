import { useState } from "react";

import { ChevronUp, FileText, Upload, X } from "lucide-react";

import { cn } from "@/shared/lib";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { Button } from "@/shared/ui/button";

interface FileUploadSectionProps {
  title?: string;
  className?: string;
}

export function FileUploadSection({
  title = "згорнути",
  className = "",
}: FileUploadSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={cn("grid gap-2", className)}>
      <Accordion type="single" collapsible>
        <AccordionItem value="file-upload">
          <div className="flex items-center justify-between gap-4">
            <div className="w-full h-0.5 bg-[#C8CDD2]"></div>
            <AccordionTrigger
              onClick={_e => {
                setIsExpanded(!isExpanded);
              }}
              className="w-full justify-between [&>svg]:hidden">
              <span className="text-sm text-[#3A4754]">{title}</span>

              <div className="p-0 bg-[#3A4754] text-white rounded-full">
                <ChevronUp
                  className={cn("w-4 h-4", isExpanded ? "rotate-180" : "")}
                />
              </div>
            </AccordionTrigger>
          </div>
          <AccordionContent className="pt-4">
            <div className="grid gap-4">
              {/* File Upload Area */}
              <div className="grid gap-4">
                <div className="border-2 border-dashed max-h-[205px] rounded-lg p-8 text-center bg-white">
                  <div className="flex flex-col items-center gap-4">
                    <Upload className="w-6 h-6 text-[#495969]" />
                    <div className="">
                      <p className="text-[#3A4754] text-sm">
                        Select your file or drag and drop
                      </p>
                      <p className="text-xs text-[#929BA5]">
                        png, pdf, jpg, docx accepted
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-full px-6"
                      onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        const input = document.createElement("input");
                        input.type = "file";
                        input.multiple = true;
                        input.accept = ".png,.pdf,.jpg,.docx";
                        input.click();
                      }}>
                      Загрузити
                    </Button>
                  </div>
                </div>

                {/* File Preview Grid */}
                <div className="grid grid-cols-5 gap-4">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div
                      key={index}
                      className="group flex flex-col items-center justify-center">
                      <div className="text-center text-[#495969] font-bold text-sm aspect-square flex flex-col items-center justify-center">
                        <FileText className="w-8 h-8 text-[#4AABFA]" />
                      </div>
                      <p className="text-xs text-gray-600 mt-2 text-center truncate">
                        Document title
                      </p>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="mt-2 w-6 h-6 bg-[#C8CDD2] hover:bg-[#C8CDD2] rounded-full transition-opacity">
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
