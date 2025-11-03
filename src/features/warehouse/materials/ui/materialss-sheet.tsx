"use client";

import React, { useState } from "react";

import {
  ArrowLeft,
  Clock,
  FileText,
  MoreHorizontal,
  Plus,
  TriangleAlert,
} from "lucide-react";

import { Separator } from "@/shared/ui";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/shared/ui/sheet";

import type {
  MaterialsSheetData,
  MaterialsSheetProps,
} from "../types/materials-sheet.types";

export default function MaterialsSheet({
  isOpen,
  onClose,
  material,
  onSave,
  onReject,
}: MaterialsSheetProps) {
  const [formData, setFormData] = useState<MaterialsSheetData | null>(material);

  React.useEffect(() => {
    setFormData(material);
  }, [material]);

  const handleInputChange = (
    field: keyof MaterialsSheetData,
    value: string
  ) => {
    if (!formData) return;
    setFormData(prev => ({
      ...prev!,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (formData && onSave) {
      onSave(formData);
    }
    onClose();
  };

  const handleReject = () => {
    if (onReject) {
      onReject();
    }
    onClose();
  };

  if (!material || !formData) {
    return null;
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[600px] sm:max-w-[600px] overflow-y-auto">
        <SheetHeader className=" pb-0">
          <div className="flex items-center  border-b pb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Назад
            </Button>
          </div>
        </SheetHeader>

        <div className="p-6 pt-0 space-y-6">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-[#3A4754] text-xl font-semibold">
              Інформація по матеріалу
            </SheetTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 border border-[#C8CDD2] rounded-full">
              <MoreHorizontal className="h-4 w-4" />
            </Button>{" "}
          </div>
          {/* Material Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 w-[105px]">
                <Clock className="h-4 w-4 text-[#3A4754]" />
                <span className="text-sm text-[#3A4754]">Створено:</span>
              </div>
              <span className="text-sm text-[#3A4754] font-medium">
                {formData.created}
              </span>
            </div>{" "}
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#3A4754] w-[105px]">
                Найменування:
              </span>
              <span className="text-sm text-[#3A4754] font-medium">
                н/ж: 504 28 [мат]
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#3A4754] w-[105px]">Толщина:</span>
              <span className="text-sm text-[#3A4754] font-medium">6.0 мм</span>
            </div>{" "}
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#3A4754] w-[105px]">Тип:</span>
              <span className="text-sm text-[#3A4754] font-medium">
                н/ж: 504 28 [мат]
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#3A4754] w-[105px]">Розмір:</span>
              <span className="text-sm text-[#3A4754] font-medium">56*24</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#3A4754] w-[105px]">Обʼєм::</span>
              <span className="text-sm text-[#3A4754] font-medium">346</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#3A4754] w-[105px]">Вага:</span>
              <span className="text-sm text-[#3A4754] font-medium">1098</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#3A4754] w-[105px]">Статус::</span>

              <Badge
                variant="outline"
                className="text-sm font-medium bg-[#D8F6FE] text-[#30B2D5]  border-none   rounded-full">
                На розгляді
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#3A4754] w-[105px] ">
                Кількість, шт.:
              </span>
              <Badge
                variant="outline"
                className="text-sm font-medium bg-[#FFE7E0] text-[#FE8867]  border-none  rounded-full">
                12
              </Badge>
              <div className="flex items-center gap-2">
                <TriangleAlert className="h-5 w-5 text-[#FE8867]" />
                <p className="text-sm text-[#FE8867] font-medium">
                  Мін. припустимий залишок
                </p>
              </div>
            </div>
            <Button variant="blue" size="lg" className="w-full h-12 mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Оформити замовлення
            </Button>
          </div>

          {/* Description */}
          <div className="border-t pt-6 flex flex-row gap-2">
            <div className="flex items-center gap-2 mb-4 h-fit min-w-[105px]">
              <FileText className="h-4 w-4 text-[#3A4754]" />
              <Label className="text-sm font-medium text-[#3A4754]">Опис</Label>
            </div>
            <p className="text-sm text-[#3A4754] leading-relaxed">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Blanditiis, omnis fugiat itaque ipsa ut laudantium voluptatibus
              ea. Veritatis, nihil sint nesciunt at voluptates doloremque,
              excepturi, aliquid nam animi doloribus quas.
            </p>
          </div>

          {/* Price Options */}
          <Separator className="my-6 h-[1px] bg-[#AAB8C2] w-full" />
          <div className=" pt-6">
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-[#3A4754]">
                    Ціна от 100 м/п
                  </Label>
                  <Input
                    value={formData.priceFrom100}
                    onChange={e =>
                      handleInputChange("priceFrom100", e.target.value)
                    }
                    placeholder="Назвою"
                    className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-[#3A4754]">
                    Ціна от 50-100 м/п
                  </Label>
                  <Input
                    value={formData.priceFrom50to100}
                    onChange={e =>
                      handleInputChange("priceFrom50to100", e.target.value)
                    }
                    placeholder="Назвою"
                    className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-[#3A4754]">
                    Ціна от 10-50 м/п
                  </Label>
                  <Input
                    value={formData.priceFrom10to50}
                    onChange={e =>
                      handleInputChange("priceFrom10to50", e.target.value)
                    }
                    placeholder="Назвою"
                    className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-[#3A4754]">
                    Ціна от 10 м/п
                  </Label>
                  <Input
                    value={formData.priceFrom10}
                    onChange={e =>
                      handleInputChange("priceFrom10", e.target.value)
                    }
                    placeholder="Назвою"
                    className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-[#3A4754]">
                    Подача, різка
                  </Label>
                  <Input
                    value={formData.feedCut}
                    onChange={e => handleInputChange("feedCut", e.target.value)}
                    placeholder="Назвою"
                    className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-[#3A4754]">
                    Час врізки
                  </Label>
                  <Input
                    value={formData.cutTime}
                    onChange={e => handleInputChange("cutTime", e.target.value)}
                    placeholder="Назвою"
                    className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
          <Separator className="my-6 h-[1px] bg-[#AAB8C2] w-full" />

          <div className=" pt-4 ">
            <div className="flex justify-between gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={handleReject}
                className="flex-1 h-12 bg-white border border-[#C8CDD2] text-[#3A4754] hover:bg-gray-50">
                Відхилити
              </Button>
              <Button
                variant="default"
                size="lg"
                onClick={handleSave}
                className="flex-1 h-12 bg-[#3A4754] hover:bg-[#2A3A4A] text-white">
                Зберегти
              </Button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
      </SheetContent>
    </Sheet>
  );
}
