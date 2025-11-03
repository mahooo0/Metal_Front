"use client";

import React, { useState } from "react";

import { Button } from "@/shared/ui/button";
import { Label } from "@/shared/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

import type {
  SupplierSelectData,
  SupplierSelectProps,
} from "../types/supplier-select.types";

export default function SupplierSelect({
  onSave,
  onCreatePurchaseRequest,
  initialData,
}: SupplierSelectProps) {
  const [supplier, setSupplier] = useState(initialData?.supplier || "");

  const handleSave = () => {
    onSave?.({ supplier });
  };

  const handleCreatePurchaseRequest = () => {
    onCreatePurchaseRequest?.();
  };

  return (
    <div className="bg-white rounded-[16px] p-6 mt-5">
      <div className="flex items-end gap-4">
        {/* Supplier Selection */}
        <div className="flex flex-col">
          <Label className="text-sm font-medium text-[#3A4754] mb-2">
            Оберіть постачальника
          </Label>
          <Select value={supplier} onValueChange={setSupplier}>
            <SelectTrigger className="min-h-[48px] w-[300px] rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
              <SelectValue placeholder="input_label" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="supplier1">ТОВ "Сервіс+"</SelectItem>
              <SelectItem value="supplier2">ТОВ "Метал-Сервіс"</SelectItem>
              <SelectItem value="supplier3">ТОВ "Пром-Метал"</SelectItem>
              <SelectItem value="supplier4">ТОВ "Метал-Трейд"</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Save Button */}
        <Button
          variant="outline"
          size="lg"
          onClick={handleSave}
          className="h-[48px] px-6 bg-white border border-[#C8CDD2] text-[#3A4754] hover:bg-gray-50">
          Зберегти
        </Button>

        {/* Create Purchase Request Button */}
        <Button
          variant="default"
          size="lg"
          onClick={handleCreatePurchaseRequest}
          className="h-[48px] px-6 bg-[#3A4754] hover:bg-[#2A3A4A] text-white ml-auto">
          Створіть заявку на закупівлю
        </Button>
      </div>
    </div>
  );
}
