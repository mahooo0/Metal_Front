"use client";

import React, { useEffect, useState } from "react";

import { ArrowLeft, Building2, Plus, Trash2 } from "lucide-react";
import { useQueryState } from "nuqs";

import { useCreateSupplier } from "@/hooks/use-create-supplier";
import { useDeleteSupplier } from "@/hooks/use-delete-supplier";
import { useSupplierById } from "@/hooks/use-supplier-by-id";
import { useUpdateSupplier } from "@/hooks/use-update-supplier";

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

interface ContactForm {
  name: string;
  phone: string;
  email: string;
}

export function SupplierSheet() {
  const [createSupplier, setCreateSupplier] = useQueryState("createSupplier", {
    defaultValue: "false",
  });
  const [editSupplierId, setEditSupplierId] = useQueryState("editSupplier");

  const isEditMode = !!editSupplierId;
  const createMutation = useCreateSupplier();
  const updateMutation = useUpdateSupplier();
  const { deleteSupplier } = useDeleteSupplier();
  const { supplier: supplierData, isLoading: isLoadingSupplier } =
    useSupplierById(editSupplierId);

  const [formData, setFormData] = useState({
    name: "",
    legalAddress: "",
    actualAddress: "",
    bankDetails: "",
    edrpou: "",
    ipn: "",
    taxId: "",
  });

  const [contacts, setContacts] = useState<ContactForm[]>([]);

  // Load data when editing
  useEffect(() => {
    if (isEditMode && supplierData && createSupplier === "true") {
      setFormData({
        name: supplierData.name || "",
        legalAddress: supplierData.legalAddress || "",
        actualAddress: supplierData.actualAddress || "",
        bankDetails: supplierData.bankDetails || "",
        edrpou: supplierData.edrpou || "",
        ipn: supplierData.ipn || "",
        taxId: supplierData.taxId || "",
      });
      setContacts(
        supplierData.contacts?.map(c => ({
          name: c.name || "",
          phone: c.phone || "",
          email: c.email || "",
        })) || []
      );
    }
  }, [isEditMode, supplierData, createSupplier]);

  // Reset form when sheet closes
  useEffect(() => {
    if (createSupplier !== "true") {
      setFormData({
        name: "",
        legalAddress: "",
        actualAddress: "",
        bankDetails: "",
        edrpou: "",
        ipn: "",
        taxId: "",
      });
      setContacts([]);
      setEditSupplierId(null);
    }
  }, [createSupplier, setEditSupplierId]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddContact = () => {
    setContacts(prev => [...prev, { name: "", phone: "", email: "" }]);
  };

  const handleRemoveContact = (index: number) => {
    setContacts(prev => prev.filter((_, i) => i !== index));
  };

  const handleContactChange = (
    index: number,
    field: keyof ContactForm,
    value: string
  ) => {
    setContacts(prev =>
      prev.map((contact, i) =>
        i === index ? { ...contact, [field]: value } : contact
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      return;
    }

    const supplierPayload = {
      name: formData.name.trim(),
      ...(formData.legalAddress && { legalAddress: formData.legalAddress.trim() }),
      ...(formData.actualAddress && { actualAddress: formData.actualAddress.trim() }),
      ...(formData.bankDetails && { bankDetails: formData.bankDetails.trim() }),
      ...(formData.edrpou && { edrpou: formData.edrpou.trim() }),
      ...(formData.ipn && { ipn: formData.ipn.trim() }),
      ...(formData.taxId && { taxId: formData.taxId.trim() }),
      ...(contacts.length > 0 && {
        contacts: contacts
          .filter(c => c.name.trim() || c.phone.trim() || c.email.trim())
          .map(c => ({
            name: c.name.trim(),
            phone: c.phone.trim(),
            email: c.email.trim(),
          })),
      }),
    };

    if (isEditMode) {
      updateMutation.mutate(
        { id: editSupplierId!, data: supplierPayload },
        {
          onSuccess: () => {
            setCreateSupplier("false");
            setEditSupplierId(null);
          },
        }
      );
    } else {
      createMutation.mutate(supplierPayload, {
        onSuccess: () => {
          setCreateSupplier("false");
        },
      });
    }
  };

  const handleDelete = () => {
    if (isEditMode && editSupplierId) {
      deleteSupplier(editSupplierId);
      setCreateSupplier("false");
      setEditSupplierId(null);
    }
  };

  const handleClose = () => {
    setCreateSupplier("false");
    setEditSupplierId(null);
  };

  const isFormValid = formData.name.trim();

  return (
    <Sheet
      open={createSupplier === "true"}
      onOpenChange={open => {
        if (!open) handleClose();
      }}>
      <SheetContent className="min-w-[620px] [&>button]:hidden px-[24px] py-[20px] overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetClose asChild>
              <Button
                variant="outline"
                size="lg"
                className="shadow-none border-none"
                onClick={handleClose}
                disabled={createMutation.isPending || updateMutation.isPending}>
                <ArrowLeft /> Назад
              </Button>
            </SheetClose>
            {isEditMode && (
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={handleDelete}>
                Видалити
              </Button>
            )}
          </div>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-[#3A4754] flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-[24px] text-[#3A4754] font-bold">
              {isEditMode ? "Редагування постачальника" : "Створення постачальника"}
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-5">
            {/* Name */}
            <div className="grid gap-2">
              <Label
                htmlFor="name"
                className="text-sm text-[#3A4754] font-medium">
                Назва постачальника *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={e => handleInputChange("name", e.target.value)}
                placeholder="Введіть назву постачальника"
                className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
                required
              />
            </div>

            {/* EDRPOU */}
            <div className="grid gap-2">
              <Label
                htmlFor="edrpou"
                className="text-sm text-[#3A4754] font-medium">
                ЄДРПОУ
              </Label>
              <Input
                id="edrpou"
                value={formData.edrpou}
                onChange={e => handleInputChange("edrpou", e.target.value)}
                placeholder="Введіть код ЄДРПОУ"
                className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
              />
            </div>

            {/* IPN */}
            <div className="grid gap-2">
              <Label
                htmlFor="ipn"
                className="text-sm text-[#3A4754] font-medium">
                ІПН
              </Label>
              <Input
                id="ipn"
                value={formData.ipn}
                onChange={e => handleInputChange("ipn", e.target.value)}
                placeholder="Введіть ІПН"
                className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
              />
            </div>

            {/* Tax ID */}
            <div className="grid gap-2">
              <Label
                htmlFor="taxId"
                className="text-sm text-[#3A4754] font-medium">
                Номер свідоцтва ПДВ
              </Label>
              <Input
                id="taxId"
                value={formData.taxId}
                onChange={e => handleInputChange("taxId", e.target.value)}
                placeholder="Введіть номер свідоцтва ПДВ"
                className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
              />
            </div>

            {/* Legal Address */}
            <div className="grid gap-2">
              <Label
                htmlFor="legalAddress"
                className="text-sm text-[#3A4754] font-medium">
                Юридична адреса
              </Label>
              <Input
                id="legalAddress"
                value={formData.legalAddress}
                onChange={e => handleInputChange("legalAddress", e.target.value)}
                placeholder="Введіть юридичну адресу"
                className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
              />
            </div>

            {/* Actual Address */}
            <div className="grid gap-2">
              <Label
                htmlFor="actualAddress"
                className="text-sm text-[#3A4754] font-medium">
                Фактична адреса
              </Label>
              <Input
                id="actualAddress"
                value={formData.actualAddress}
                onChange={e => handleInputChange("actualAddress", e.target.value)}
                placeholder="Введіть фактичну адресу"
                className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
              />
            </div>

            {/* Bank Details */}
            <div className="grid gap-2">
              <Label
                htmlFor="bankDetails"
                className="text-sm text-[#3A4754] font-medium">
                Банківські реквізити
              </Label>
              <Textarea
                id="bankDetails"
                value={formData.bankDetails}
                onChange={e => handleInputChange("bankDetails", e.target.value)}
                placeholder="Введіть банківські реквізити (IBAN, МФО, назва банку)"
                className="min-h-[100px] w-full rounded-[16px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
              />
            </div>

            {/* Contacts Section */}
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm text-[#3A4754] font-medium">
                  Контакти
                </Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddContact}
                  className="gap-1">
                  <Plus className="w-4 h-4" />
                  Додати контакт
                </Button>
              </div>

              {contacts.map((contact, index) => (
                <div
                  key={index}
                  className="grid gap-3 p-4 border border-[#E5E7EB] rounded-xl bg-[#F9FAFB]">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#6D7A87]">
                      Контакт {index + 1}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveContact(index)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8 w-8 p-0">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid gap-3">
                    <Input
                      value={contact.name}
                      onChange={e =>
                        handleContactChange(index, "name", e.target.value)
                      }
                      placeholder="Ім'я контактної особи"
                      className="min-h-[44px] w-full rounded-[48px] bg-white px-4 py-2 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
                    />
                    <Input
                      type="tel"
                      value={contact.phone}
                      onChange={e =>
                        handleContactChange(index, "phone", e.target.value)
                      }
                      placeholder="Телефон"
                      className="min-h-[44px] w-full rounded-[48px] bg-white px-4 py-2 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
                    />
                    <Input
                      type="email"
                      value={contact.email}
                      onChange={e =>
                        handleContactChange(index, "email", e.target.value)
                      }
                      placeholder="Email"
                      className="min-h-[44px] w-full rounded-[48px] bg-white px-4 py-2 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
                    />
                  </div>
                </div>
              ))}

              {contacts.length === 0 && (
                <p className="text-sm text-[#6D7A87] text-center py-4">
                  Контакти не додані
                </p>
              )}
            </div>
          </form>
        </div>
        <SheetFooter className="flex items-center justify-between flex-row gap-6 mt-8">
          <SheetClose asChild className="w-1/2">
            <Button
              variant="BlackTransparent"
              size="lg"
              onClick={handleClose}
              disabled={createMutation.isPending || updateMutation.isPending}>
              Відхилити
            </Button>
          </SheetClose>
          <Button
            type="submit"
            variant="balck"
            size="lg"
            className="w-1/2"
            disabled={
              createMutation.isPending ||
              updateMutation.isPending ||
              isLoadingSupplier ||
              !isFormValid
            }
            onClick={handleSubmit}>
            {createMutation.isPending || updateMutation.isPending
              ? "Збереження..."
              : isEditMode
                ? "Оновити"
                : "Зберегти"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
