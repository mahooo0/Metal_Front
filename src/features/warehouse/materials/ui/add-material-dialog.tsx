"use client";

import React, { useState } from "react";

import { Pencil, X } from "lucide-react";

import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Textarea } from "@/shared/ui/textarea";

import type {
  AddMaterialData,
  AddMaterialDialogProps,
} from "../types/add-material.types";

export default function AddMaterialDialog({
  isOpen,
  onClose,
  onSave,
}: AddMaterialDialogProps) {
  const [formData, setFormData] = useState<AddMaterialData>({
    name: "",
    thickness: "",
    type: "",
    width: "",
    length: "",
    volume: "",
    weight: "",
    sheetType: "",
    quantity: "",
    minimumQuantity: "",
    comment: "",
  });

  const handleInputChange = (field: keyof AddMaterialData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    onSave(formData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      name: "",
      thickness: "",
      type: "",
      width: "",
      length: "",
      volume: "",
      weight: "",
      sheetType: "",
      quantity: "",
      minimumQuantity: "",
      comment: "",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Pencil className="h-5 w-5 text-[#3A4754]" />
              <DialogTitle className="text-[#3A4754] text-xl font-semibold">
                Додати матеріал
              </DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Name */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#3A4754]">Назва</Label>
            <Input
              value={formData.name}
              onChange={e => handleInputChange("name", e.target.value)}
              placeholder="input_label"
              className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
            />
          </div>

          {/* Thickness and Type */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#3A4754]">
                Товщина
              </Label>
              <Select
                value={formData.thickness}
                onValueChange={value => handleInputChange("thickness", value)}>
                <SelectTrigger className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
                  <SelectValue placeholder="input_label" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 мм</SelectItem>
                  <SelectItem value="2">2 мм</SelectItem>
                  <SelectItem value="3">3 мм</SelectItem>
                  <SelectItem value="4">4 мм</SelectItem>
                  <SelectItem value="5">5 мм</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#3A4754]">Тип</Label>
              <Select
                value={formData.type}
                onValueChange={value => handleInputChange("type", value)}>
                <SelectTrigger className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
                  <SelectValue placeholder="input_label" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="steel">Сталь</SelectItem>
                  <SelectItem value="aluminum">Алюміній</SelectItem>
                  <SelectItem value="copper">Мідь</SelectItem>
                  <SelectItem value="brass">Латунь</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Width and Length */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#3A4754]">
                Ширина
              </Label>
              <Input
                value={formData.width}
                onChange={e => handleInputChange("width", e.target.value)}
                placeholder="input_label"
                className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#3A4754]">
                Довжина
              </Label>
              <Input
                value={formData.length}
                onChange={e => handleInputChange("length", e.target.value)}
                placeholder="input_label"
                className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
              />
            </div>
          </div>

          {/* Volume and Weight */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#3A4754]">
                Об&apos;єм
              </Label>
              <Input
                value={formData.volume}
                onChange={e => handleInputChange("volume", e.target.value)}
                placeholder="input_label"
                className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#3A4754]">Вага</Label>
              <Input
                value={formData.weight}
                onChange={e => handleInputChange("weight", e.target.value)}
                placeholder="input_label"
                className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
              />
            </div>
          </div>

          {/* Sheet Type and Quantity */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#3A4754]">
                Тип листу
              </Label>
              <Select
                value={formData.sheetType}
                onValueChange={value => handleInputChange("sheetType", value)}>
                <SelectTrigger className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
                  <SelectValue placeholder="input_label" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="430_grind">430 шліф</SelectItem>
                  <SelectItem value="304_polish">304 поліровка</SelectItem>
                  <SelectItem value="316_matte">316 матовий</SelectItem>
                  <SelectItem value="201_brushed">201 щітка</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#3A4754]">
                Кількість
              </Label>
              <Input
                value={formData.quantity}
                onChange={e => handleInputChange("quantity", e.target.value)}
                placeholder="input_label"
                className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
              />
            </div>
          </div>

          {/* Minimum Quantity */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#3A4754]">
              Мін. припустима кількість
            </Label>
            <Input
              value={formData.minimumQuantity}
              onChange={e =>
                handleInputChange("minimumQuantity", e.target.value)
              }
              placeholder="input_label"
              className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
            />
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#3A4754]">
              Коментар
            </Label>
            <Textarea
              value={formData.comment}
              onChange={e => handleInputChange("comment", e.target.value)}
              placeholder="text_area"
              className="min-h-[120px] w-full rounded-[16px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm resize-none"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className=" justify-end w-full pt-4 border-t grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={handleClose}
            className="h-12 px-6 bg-white border border-[#C8CDD2] text-[#3A4754] hover:bg-gray-50">
            Відмінити
          </Button>
          <Button
            variant="default"
            size="lg"
            onClick={handleSave}
            className="h-12 px-6 bg-[#3A4754] hover:bg-[#2A3A4A] text-white">
            Зберегти
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
