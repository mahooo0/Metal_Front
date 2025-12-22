"use client";

import React, { useEffect, useState } from "react";

import { useCreatePlanRecord } from "@/hooks/use-create-plan-record";
import { useOrderRequests } from "@/hooks/use-order-requests";
import { usePlanRecordById } from "@/hooks/use-plan-record-by-id";
import { useUpdatePlanRecord } from "@/hooks/use-update-plan-record";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { FilePenLine, Trash2 } from "lucide-react";

import { FileUploadSection } from "@/features/order/ui/file-upload-section";
import { MetalBrandSelect } from "@/features/plan-register/ui/metal-brand-select";

import { Button } from "@/shared/ui/button";
import { DatePicker } from "@/shared/ui/date-picked";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
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

interface AddPlanDialogProps {
  isOpen: boolean;
  onClose: () => void;
  planRecordId?: string;
  onSave?: (data: {
    registrationDate: string;
    planNumber: string;
    orderNumber: string;
    metalBrandId: string;
    metalThickness: number;
  }) => void;
}

export default function AddPlanDialog({
  isOpen,
  onClose,
  planRecordId,
  onSave,
}: AddPlanDialogProps) {
  const isEditMode = !!planRecordId;
  const createMutation = useCreatePlanRecord();
  const updateMutation = useUpdatePlanRecord();
  const { data: ordersData } = useOrderRequests({ page: 1, limit: 100 });
  const { planRecord, isLoading: isLoadingPlanRecord } = usePlanRecordById(
    planRecordId,
    isEditMode && isOpen
  );

  const [formData, setFormData] = useState({
    registrationDate: "",
    planNumber: "",
    orderNumber: "",
    metalBrandId: "",
    metalThickness: "",
  });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  // Load data when editing
  useEffect(() => {
    if (isEditMode && planRecord && isOpen) {
      const date = planRecord.registrationDate
        ? new Date(planRecord.registrationDate)
        : undefined;

      // Format date for DatePicker (it expects "15 January 2025" format)
      let formattedDate = "";
      if (date && !isNaN(date.getTime())) {
        formattedDate = format(date, "dd MMMM yyyy", {
          locale: enUS,
        });
      }

      setFormData({
        registrationDate: formattedDate,
        planNumber: planRecord.planNumber || "",
        orderNumber: planRecord.orderNumber || "",
        metalBrandId: planRecord.metalBrandId || "",
        metalThickness: String(planRecord.metalThickness || ""),
      });
      setSelectedDate(date);
    }
  }, [isEditMode, planRecord, isOpen]);

  // Reset form when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        registrationDate: "",
        planNumber: "",
        orderNumber: "",
        metalBrandId: "",
        metalThickness: "",
      });
      setSelectedDate(undefined);
    }
  }, [isOpen]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateChange = (value: string) => {
    console.log("handleDateChange called with value:", value);
    setFormData(prev => ({
      ...prev,
      registrationDate: value,
    }));
    // Try to parse the date from DatePicker format
    // DatePicker returns "15 January 2025" format
    try {
      const parts = value.split(" ");
      if (parts.length === 3) {
        const day = parseInt(parts[0]);
        const monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        const month = monthNames.indexOf(parts[1]);
        const year = parseInt(parts[2]);
        if (month !== -1 && !isNaN(day) && !isNaN(year)) {
          const date = new Date(year, month, day);
          console.log("Parsed date:", date);
          setSelectedDate(date);
        } else {
          console.log("Failed to parse date parts:", {
            day,
            month,
            year,
            parts,
          });
        }
      } else {
        // Try direct parsing
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
          console.log("Direct parsed date:", date);
          setSelectedDate(date);
        } else {
          console.log("Failed to parse date directly:", value);
        }
      }
    } catch (error) {
      console.error("Error in handleDateChange:", error);
    }
  };

  const handleSave = () => {
    console.log("handleSave called", formData, selectedDate);

    if (
      !formData.registrationDate ||
      !formData.planNumber ||
      !formData.orderNumber ||
      !formData.metalBrandId ||
      !formData.metalThickness
    ) {
      console.log("Validation failed", {
        registrationDate: formData.registrationDate,
        planNumber: formData.planNumber,
        orderNumber: formData.orderNumber,
        metalBrandId: formData.metalBrandId,
        metalThickness: formData.metalThickness,
      });
      return;
    }

    // Convert date to yyyy-MM-dd format
    // Priority: selectedDate > parse from string
    let registrationDate = "";

    if (selectedDate) {
      registrationDate = format(selectedDate, "yyyy-MM-dd");
      console.log("Using selectedDate:", registrationDate);
    } else if (formData.registrationDate) {
      // Parse from DatePicker format: "15 January 2025"
      try {
        const parts = formData.registrationDate.trim().split(" ");
        if (parts.length === 3) {
          const day = parseInt(parts[0], 10);
          const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];
          const month = monthNames.indexOf(parts[1]);
          const year = parseInt(parts[2], 10);

          if (
            month !== -1 &&
            !isNaN(day) &&
            !isNaN(year) &&
            day > 0 &&
            day <= 31
          ) {
            const date = new Date(year, month, day);
            if (!isNaN(date.getTime())) {
              registrationDate = format(date, "yyyy-MM-dd");
              console.log("Parsed date from string:", registrationDate);
            }
          }
        }

        // If parsing failed, try direct Date parsing
        if (!registrationDate) {
          const date = new Date(formData.registrationDate);
          if (!isNaN(date.getTime())) {
            registrationDate = format(date, "yyyy-MM-dd");
            console.log("Direct parsed date:", registrationDate);
          }
        }
      } catch (error) {
        console.error("Error parsing date:", error, formData.registrationDate);
      }
    }

    if (!registrationDate) {
      console.error(
        "Failed to parse registrationDate from:",
        formData.registrationDate
      );
      alert(
        "Помилка: не вдалося розпізнати дату. Будь ласка, оберіть дату знову."
      );
      return;
    }

    const metalThicknessNum = parseFloat(formData.metalThickness);
    if (isNaN(metalThicknessNum) || metalThicknessNum <= 0) {
      console.error("Invalid metalThickness:", formData.metalThickness);
      alert("Помилка: некоректна товщина металу.");
      return;
    }

    const planRecordData = {
      registrationDate,
      planNumber: formData.planNumber.trim(),
      orderNumber: formData.orderNumber.trim(),
      metalBrandId: formData.metalBrandId,
      metalThickness: metalThicknessNum,
    };

    console.log("Sending plan record data:", planRecordData);

    if (isEditMode && planRecordId) {
      updateMutation.mutate(
        { id: planRecordId, data: planRecordData },
        {
          onSuccess: data => {
            console.log("Plan record updated successfully:", data);
            if (onSave) {
              onSave(planRecordData);
            }
            onClose();
          },
          onError: error => {
            console.error("Error updating plan record:", error);
          },
        }
      );
    } else {
      createMutation.mutate(planRecordData, {
        onSuccess: data => {
          console.log("Plan record created successfully:", data);
          if (onSave) {
            onSave(planRecordData);
          }
          onClose();
        },
        onError: error => {
          console.error("Error creating plan record:", error);
        },
      });
    }
  };

  const handleDelete = () => {
    // Handle delete logic here
    onClose();
  };

  const orders = ordersData?.data || [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 17, 0.4) 36.54%, rgba(0, 0, 36, 0.8) 100%)",
        }}
      />
      <DialogContent className="max-w-2xl bg-white rounded-lg shadow-lg">
        <DialogHeader className="flex flex-row items-center justify-between border-b border-[#E5E7EB] pb-2 relative">
          <DialogTitle className="flex items-center gap-2 text-[20px] font-bold text-[#3A4754]">
            <FilePenLine className="h-6 w-6" />
            {isEditMode ? "Редагувати план" : "Додати план"}
          </DialogTitle>
          <Button
            variant="ghost"
            onClick={handleDelete}
            className="text-[#6D7A87] absolute top-[102%] right-0">
            <Trash2 className="h-4 w-4" />
            видалити
          </Button>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* Form Fields */}
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="registrationDate">Дата реєстрації</Label>
              <DatePicker
                placeholder="Оберіть дату реєстрації"
                value={formData.registrationDate}
                onChange={handleDateChange}
                className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="planNumber">№ плану</Label>
              <Input
                id="planNumber"
                value={formData.planNumber}
                onChange={e => handleInputChange("planNumber", e.target.value)}
                placeholder="Введіть номер плану"
                className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="orderNumber">№ замовлення</Label>
              <Select
                value={formData.orderNumber}
                onValueChange={value =>
                  handleInputChange("orderNumber", value)
                }>
                <SelectTrigger className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
                  <SelectValue placeholder="Оберіть номер замовлення" />
                </SelectTrigger>
                <SelectContent>
                  {orders.length === 0 ? (
                    <SelectItem value="" disabled>
                      Немає замовлень
                    </SelectItem>
                  ) : (
                    orders.map(order => (
                      <SelectItem
                        key={order.id}
                        value={order.indexLike || order.id}>
                        {order.indexLike || order.id}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="metalBrandId">Марка металу</Label>
              <MetalBrandSelect
                value={formData.metalBrandId}
                onValueChange={value =>
                  handleInputChange("metalBrandId", value)
                }
                placeholder="Оберіть марку металу"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="metalThickness">Товщина металу (мм)</Label>
              <Input
                id="metalThickness"
                type="number"
                step="0.1"
                value={formData.metalThickness}
                onChange={e =>
                  handleInputChange("metalThickness", e.target.value)
                }
                placeholder="Введіть товщину металу"
                className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
              />
            </div>
          </div>

          {/* File Upload Section */}
          <FileUploadSection title="згорнути" />
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between gap-3 mt-8">
          <Button
            variant="BlackTransparent"
            onClick={onClose}
            className="w-1/2 h-[42px] rounded-[48px]">
            Відмінити
          </Button>
          <Button
            variant="balck"
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              console.log("Button clicked, calling handleSave");
              handleSave();
            }}
            disabled={
              !formData.registrationDate ||
              !formData.planNumber ||
              !formData.orderNumber ||
              !formData.metalBrandId ||
              !formData.metalThickness ||
              createMutation.isPending ||
              updateMutation.isPending ||
              isLoadingPlanRecord
            }
            className="w-1/2 h-[42px] rounded-[48px]">
            {isLoadingPlanRecord
              ? "Завантаження..."
              : createMutation.isPending || updateMutation.isPending
                ? "Збереження..."
                : "Зберегти"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
