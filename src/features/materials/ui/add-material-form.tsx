"use client";

import React, { useState } from "react";

import { Minus, Plus } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Label } from "@/shared/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Textarea } from "@/shared/ui/textarea";

export default function AddMaterialForm() {
  const [materialType, setMaterialType] = useState<"warehouse" | "client">(
    "warehouse"
  );
  const [quantity, setQuantity] = useState(20);
  const [formData, setFormData] = useState({
    material: "",
    warehouse: "",
    thickness: "",
    weight: "",
    width: "",
    length: "",
    comment: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleQuantityChange = (operation: "increment" | "decrement") => {
    if (operation === "increment") {
      setQuantity(prev => prev + 1);
    } else if (operation === "decrement" && quantity > 0) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    // TODO: Implement form submission
    // Submit form data: { ...formData, quantity, materialType }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm mt-5 ">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Закріпити матеріал
        </h2>
        <Button variant="blue" size="lg" className="h-[42px]">
          <Plus className="h-4 w-4 mr-2" />
          Додати новий
        </Button>
      </div>

      {/* Material Type Selection */}
      <div className="mb-6">
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="materialType"
              value="warehouse"
              checked={materialType === "warehouse"}
              onChange={e =>
                setMaterialType(e.target.value as "warehouse" | "client")
              }
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">
              Матеріал зі складу
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="materialType"
              value="client"
              checked={materialType === "client"}
              onChange={e =>
                setMaterialType(e.target.value as "warehouse" | "client")
              }
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">
              Матеріал клієнта
            </span>
          </label>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        {/* Material Selection */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Оберіть матеріал
          </Label>
          <Select
            value={formData.material}
            onValueChange={value => handleInputChange("material", value)}>
            <SelectTrigger className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
              <SelectValue placeholder="input_label" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="steel-304">Сталь 304</SelectItem>
              <SelectItem value="steel-316">Сталь 316</SelectItem>
              <SelectItem value="aluminum">Алюміній</SelectItem>
              <SelectItem value="copper">Мідь</SelectItem>
              <SelectItem value="brass">Латунь</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Warehouse */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Склад
          </Label>
          <Select
            value={formData.warehouse}
            onValueChange={value => handleInputChange("warehouse", value)}>
            <SelectTrigger className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
              <SelectValue placeholder="input_label" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="warehouse-1">Склад №1</SelectItem>
              <SelectItem value="warehouse-2">Склад №2</SelectItem>
              <SelectItem value="warehouse-3">Склад №3</SelectItem>
              <SelectItem value="warehouse-main">Головний склад</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Thickness and Weight Row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Товщина
            </Label>
            <Select
              value={formData.thickness}
              onValueChange={value => handleInputChange("thickness", value)}>
              <SelectTrigger className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
                <SelectValue placeholder="input_label" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1mm">1 мм</SelectItem>
                <SelectItem value="2mm">2 мм</SelectItem>
                <SelectItem value="3mm">3 мм</SelectItem>
                <SelectItem value="4mm">4 мм</SelectItem>
                <SelectItem value="5mm">5 мм</SelectItem>
                <SelectItem value="6mm">6 мм</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Вага
            </Label>
            <Select
              value={formData.weight}
              onValueChange={value => handleInputChange("weight", value)}>
              <SelectTrigger className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
                <SelectValue placeholder="input_label" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Легкий</SelectItem>
                <SelectItem value="medium">Середній</SelectItem>
                <SelectItem value="heavy">Важкий</SelectItem>
                <SelectItem value="extra-heavy">Дуже важкий</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Width and Length Row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Ширина
            </Label>
            <Select
              value={formData.width}
              onValueChange={value => handleInputChange("width", value)}>
              <SelectTrigger className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
                <SelectValue placeholder="input_label" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="50mm">50 мм</SelectItem>
                <SelectItem value="100mm">100 мм</SelectItem>
                <SelectItem value="150mm">150 мм</SelectItem>
                <SelectItem value="200mm">200 мм</SelectItem>
                <SelectItem value="250mm">250 мм</SelectItem>
                <SelectItem value="300mm">300 мм</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Довжина
            </Label>
            <Select
              value={formData.length}
              onValueChange={value => handleInputChange("length", value)}>
              <SelectTrigger className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
                <SelectValue placeholder="input_label" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="100mm">100 мм</SelectItem>
                <SelectItem value="200mm">200 мм</SelectItem>
                <SelectItem value="300mm">300 мм</SelectItem>
                <SelectItem value="400mm">400 мм</SelectItem>
                <SelectItem value="500mm">500 мм</SelectItem>
                <SelectItem value="1000mm">1000 мм</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Comment */}
        <div>
          <Label
            htmlFor="comment"
            className="text-sm font-medium text-gray-700 mb-2 block">
            Коментар
          </Label>
          <Textarea
            id="comment"
            placeholder="text_area"
            value={formData.comment}
            onChange={e => handleInputChange("comment", e.target.value)}
            className="min-h-[100px] w-full rounded-[24px] bg-white  resize-none"
          />
        </div>

        {/* Quantity and Submit Row */}
        <div className="flex items-center justify-between pt-4">
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Кількість
            </Label>
            <div className="flex items-center gap-3 border border-[#C8CDD2] rounded-[48px] px-4 py-3">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full border-2 border-[#3A4754]"
                onClick={() => handleQuantityChange("decrement")}
                disabled={quantity <= 0}>
                <Minus className="h-6 w-6 font-bold" color="#3A4754" />
              </Button>

              <div className="w-12 text-center">
                <span className="text-lg font-medium text-gray-900">
                  {quantity}
                </span>
              </div>

              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full border-2 border-[#3A4754] "
                onClick={() => handleQuantityChange("increment")}>
                <Plus className="h-6 w-6 font-bold" color="#3A4754" />
              </Button>
            </div>
          </div>

          <Button
            type="button"
            size="lg"
            onClick={handleSubmit}
            variant="balck"
            className="w-[296px] h-[48px] mt-6">
            Додати до списку
          </Button>
        </div>
      </div>
    </div>
  );
}
