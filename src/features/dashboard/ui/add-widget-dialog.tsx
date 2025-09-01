import React from "react";

import { widgetTypes } from "@/features/dashboard/constants/widgets";

import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";

interface AddWidgetDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddWidget: (widgetType: string) => void;
}

export default function AddWidgetDialog({
  isOpen,
  onClose,
  onAddWidget,
}: AddWidgetDialogProps) {
  // Get column span class based on widget width
  const getColumnSpan = (width: number) => {
    switch (width) {
      case 3:
        return "col-span-3";
      case 4:
        return "col-span-4";
      case 5:
        return "col-span-5";
      case 6:
        return "col-span-6";
      case 7:
        return "col-span-7";
      case 8:
        return "col-span-8";
      case 9:
        return "col-span-9";
      default:
        return "col-span-3";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!min-w-[1200px] !min-h-[90vh] !max-w-[1200px] !max-h-[90vh] overflow-y-auto p-8 bg-white flex flex-col justify-start">
        <DialogHeader className="mb-8 h-fit">
          <DialogTitle className="text-[28px] font-bold text-[#3A4754]">
            Додати віджет
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-9 gap-6">
          {widgetTypes.map(widget => {
            const WidgetComponent = widget.component;
            return (
              <div
                key={widget.id}
                className={cn(
                  "rounded-lg transition-all duration-200 hover:border-gray-300 bg-white",
                  getColumnSpan(widget.defaultSize.w)
                )}>
                <div
                  className="mb-6 rounded-xl overflow-hidden"
                  style={{ boxShadow: "2.41px 4.01px 20.21px 0px #6B72804D" }}>
                  <WidgetComponent />
                </div>

                <div className="mb-6 flex justify-between items-center">
                  <h3 className="font-medium text-[#495969] mb-2 text-sm">
                    {widget.name}
                  </h3>
                  <Button
                    onClick={() => {
                      onAddWidget(widget.id);
                      onClose();
                    }}
                    variant="blueTransparent"
                    size="custom">
                    Додати
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
