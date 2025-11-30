"use client";

import React, { useEffect, useState } from "react";

import { UpdateCounterpartyDto } from "@/service/counterparties.service";
import { ArrowLeft, FilePenLine } from "lucide-react";

import { CounterpartyItem } from "@/features/counterparties/types/counterparty.types";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
} from "@/shared/ui/sheet";
import { Textarea } from "@/shared/ui/textarea";

export interface EditCounterpartySheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: UpdateCounterpartyDto) => void;
  counterparty: CounterpartyItem | null;
  isPending?: boolean;
}

export default function EditCounterpartySheet({
  isOpen,
  onClose,
  onSave,
  counterparty,
  isPending = false,
}: EditCounterpartySheetProps) {
  const [formData, setFormData] = useState<UpdateCounterpartyDto>({
    name: "",
    comment: "",
    legalAddress: "",
    actualAddress: "",
    bankDetails: "",
    edrpou: "",
    ipn: "",
    vatCertificate: "",
  });

  // Reset form when sheet opens or counterparty changes
  useEffect(() => {
    if (isOpen && counterparty) {
      setFormData({
        name: counterparty.name || "",
        comment: counterparty.comment || "",
        legalAddress: counterparty.legalAddress || "",
        actualAddress: counterparty.actualAddress || "",
        bankDetails: counterparty.bankDetails || "",
        edrpou: counterparty.edrpou || "",
        ipn: counterparty.ipn || "",
        vatCertificate: counterparty.vatCertificate || "",
      });
    }
  }, [isOpen, counterparty]);

  const handleInputChange = (
    field: keyof UpdateCounterpartyDto,
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      return;
    }
    onSave(formData);
  };

  const handleClose = () => {
    if (!isPending) {
      onClose();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={open => !open && handleClose()}>
      <SheetContent className="w-[800px] sm:max-w-[800px] flex flex-col [&>button]:hidden">
        <SheetHeader className="border-b pb-4 shrink-0">
          <div className="flex items-center justify-between">
            <SheetClose asChild>
              <Button
                variant="outline"
                size="lg"
                className="shadow-none border-none">
                <ArrowLeft /> Назад
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>

        <div className="px-6 py-6 flex flex-col gap-6 flex-1 overflow-y-auto">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-[#3A4754] flex items-center justify-center">
              <FilePenLine className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-[24px] text-[#3A4754] font-bold">
              Редагувати контрагента
            </h2>
          </div>

          <div className="space-y-6">
            {/* Назва контрагента */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Назва контрагента <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Введіть назву контрагента"
                value={formData.name}
                onChange={e => handleInputChange("name", e.target.value)}
                className="bg-white"
                required
              />
            </div>

            {/* Коментар */}
            <div className="space-y-2">
              <Label htmlFor="comment" className="text-sm font-medium">
                Коментар
              </Label>
              <Textarea
                id="comment"
                placeholder="Введіть коментар (необов'язково)"
                value={formData.comment || ""}
                onChange={e => handleInputChange("comment", e.target.value)}
                className="bg-white min-h-[100px]"
              />
            </div>

            {/* Юридична адреса */}
            <div className="space-y-2">
              <Label htmlFor="legalAddress" className="text-sm font-medium">
                Юридична адреса <span className="text-red-500">*</span>
              </Label>
              <Input
                id="legalAddress"
                placeholder="Введіть юридичну адресу"
                value={formData.legalAddress}
                onChange={e =>
                  handleInputChange("legalAddress", e.target.value)
                }
                className="bg-white"
                required
              />
            </div>

            {/* Фактична адреса */}
            <div className="space-y-2">
              <Label htmlFor="actualAddress" className="text-sm font-medium">
                Фактична адреса <span className="text-red-500">*</span>
              </Label>
              <Input
                id="actualAddress"
                placeholder="Введіть фактичну адресу"
                value={formData.actualAddress}
                onChange={e =>
                  handleInputChange("actualAddress", e.target.value)
                }
                className="bg-white"
                required
              />
            </div>

            {/* Банківські реквізити */}
            <div className="space-y-2">
              <Label htmlFor="bankDetails" className="text-sm font-medium">
                Банківські реквізити
              </Label>
              <Textarea
                id="bankDetails"
                placeholder="Введіть банківські реквізити (необов'язково)"
                value={formData.bankDetails || ""}
                onChange={e => handleInputChange("bankDetails", e.target.value)}
                className="bg-white min-h-[100px]"
              />
            </div>

            {/* ЄДРПОУ */}
            <div className="space-y-2">
              <Label htmlFor="edrpou" className="text-sm font-medium">
                ЄДРПОУ
              </Label>
              <Input
                id="edrpou"
                placeholder="Введіть ЄДРПОУ (необов'язково)"
                value={formData.edrpou || ""}
                onChange={e => handleInputChange("edrpou", e.target.value)}
                className="bg-white"
              />
            </div>

            {/* ІПН */}
            <div className="space-y-2">
              <Label htmlFor="ipn" className="text-sm font-medium">
                ІПН
              </Label>
              <Input
                id="ipn"
                placeholder="Введіть ІПН (необов'язково)"
                value={formData.ipn || ""}
                onChange={e => handleInputChange("ipn", e.target.value)}
                className="bg-white"
              />
            </div>

            {/* Св-во ПДВ */}
            <div className="space-y-2">
              <Label htmlFor="vatCertificate" className="text-sm font-medium">
                Св-во ПДВ
              </Label>
              <Input
                id="vatCertificate"
                placeholder="Введіть свідоцтво ПДВ (необов'язково)"
                value={formData.vatCertificate || ""}
                onChange={e =>
                  handleInputChange("vatCertificate", e.target.value)
                }
                className="bg-white"
              />
            </div>
          </div>
        </div>

        <SheetFooter className="flex items-center justify-between flex-row gap-6 px-6 pb-6 border-t pt-4 shrink-0">
          <SheetClose asChild className="w-1/2">
            <Button
              variant="BlackTransparent"
              size="lg"
              disabled={isPending}
              className="w-1/2">
              Відмінити
            </Button>
          </SheetClose>
          <Button
            variant="balck"
            size="lg"
            onClick={handleSave}
            disabled={
              isPending ||
              !formData.name.trim() ||
              !formData.legalAddress.trim() ||
              !formData.actualAddress.trim()
            }
            className="w-1/2">
            {isPending ? "Збереження..." : "Зберегти"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
