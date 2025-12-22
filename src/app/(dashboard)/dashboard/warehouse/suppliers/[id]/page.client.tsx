"use client";

import React from "react";

import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  Building2,
  Calendar,
  CreditCard,
  FileText,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Trash2,
  User,
} from "lucide-react";
import { useQueryState } from "nuqs";

import { useDeleteSupplier } from "@/hooks/use-delete-supplier";
import { useSupplierById } from "@/hooks/use-supplier-by-id";

import { SupplierSheet } from "@/features/warehouse/suppliers";

import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

const formatDate = (dateString: string): string => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString("uk-UA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
};

export default function SuppliersByIdPageClient({ id }: { id: string }) {
  const router = useRouter();
  const { supplier, isLoading, error } = useSupplierById(id);
  const { deleteSupplier, isPending: isDeleting } = useDeleteSupplier();

  const [, setCreateSupplier] = useQueryState("createSupplier", {
    defaultValue: "false",
  });
  const [, setEditSupplierId] = useQueryState("editSupplier");

  const handleBack = () => {
    router.push("/dashboard/warehouse/suppliers");
  };

  const handleEdit = () => {
    setEditSupplierId(id);
    setCreateSupplier("true");
  };

  const handleDelete = () => {
    if (confirm("Ви впевнені, що хочете видалити цього постачальника?")) {
      deleteSupplier(id);
      router.push("/dashboard/warehouse/suppliers");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-[#6D7A87]">Завантаження...</p>
      </div>
    );
  }

  if (error || !supplier) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-red-500">Постачальника не знайдено</p>
        <Button variant="outline" onClick={handleBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Повернутися до списку
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="lg" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-[#3A4754] flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-[24px] text-[#3A4754] font-bold">
                {supplier.name}
              </h1>
              <p className="text-sm text-[#6D7A87]">ID: {supplier.id}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="lg" onClick={handleEdit}>
            <Pencil className="w-4 h-4 mr-2" />
            Редагувати
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={handleDelete}
            disabled={isDeleting}>
            <Trash2 className="w-4 h-4 mr-2" />
            Видалити
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-12 gap-6">
        {/* Main Info */}
        <div className="col-span-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#3A4754]">
                Інформація про постачальника
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* EDRPOU */}
              {supplier.edrpou && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F0F2F5] flex items-center justify-center">
                    <FileText className="w-5 h-5 text-[#6D7A87]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#6D7A87]">ЄДРПОУ</p>
                    <p className="text-base text-[#3A4754] font-medium">
                      {supplier.edrpou}
                    </p>
                  </div>
                </div>
              )}

              {/* IPN */}
              {supplier.ipn && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F0F2F5] flex items-center justify-center">
                    <FileText className="w-5 h-5 text-[#6D7A87]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#6D7A87]">ІПН</p>
                    <p className="text-base text-[#3A4754] font-medium">
                      {supplier.ipn}
                    </p>
                  </div>
                </div>
              )}

              {/* Tax ID */}
              {supplier.taxId && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F0F2F5] flex items-center justify-center">
                    <FileText className="w-5 h-5 text-[#6D7A87]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#6D7A87]">Номер свідоцтва ПДВ</p>
                    <p className="text-base text-[#3A4754] font-medium">
                      {supplier.taxId}
                    </p>
                  </div>
                </div>
              )}

              {/* Legal Address */}
              {supplier.legalAddress && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F0F2F5] flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#6D7A87]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#6D7A87]">Юридична адреса</p>
                    <p className="text-base text-[#3A4754] font-medium">
                      {supplier.legalAddress}
                    </p>
                  </div>
                </div>
              )}

              {/* Actual Address */}
              {supplier.actualAddress && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F0F2F5] flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#6D7A87]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#6D7A87]">Фактична адреса</p>
                    <p className="text-base text-[#3A4754] font-medium">
                      {supplier.actualAddress}
                    </p>
                  </div>
                </div>
              )}

              {/* Bank Details */}
              {supplier.bankDetails && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F0F2F5] flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-[#6D7A87]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#6D7A87]">Банківські реквізити</p>
                    <p className="text-base text-[#3A4754] font-medium whitespace-pre-wrap">
                      {supplier.bankDetails}
                    </p>
                  </div>
                </div>
              )}

              {/* Contacts */}
              {supplier.contacts && supplier.contacts.length > 0 && (
                <div className="border-t pt-6">
                  <p className="text-sm text-[#6D7A87] mb-4">Контакти</p>
                  <div className="grid gap-4">
                    {supplier.contacts.map((contact, index) => (
                      <div
                        key={contact.id || index}
                        className="p-4 border border-[#E5E7EB] rounded-xl bg-[#F9FAFB]">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-8 h-8 rounded-full bg-[#3A4754] flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="text-base text-[#3A4754] font-medium">
                              {contact.name}
                            </p>
                          </div>
                        </div>
                        <div className="grid gap-2 ml-11">
                          {contact.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-[#6D7A87]" />
                              <a
                                href={`tel:${contact.phone}`}
                                className="text-sm text-blue-600 hover:underline">
                                {contact.phone}
                              </a>
                            </div>
                          )}
                          {contact.email && (
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-[#6D7A87]" />
                              <a
                                href={`mailto:${contact.email}`}
                                className="text-sm text-blue-600 hover:underline">
                                {contact.email}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Side Info */}
        <div className="col-span-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#3A4754]">
                Додаткова інформація
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F0F2F5] flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[#6D7A87]" />
                </div>
                <div>
                  <p className="text-sm text-[#6D7A87]">Дата створення</p>
                  <p className="text-base text-[#3A4754] font-medium">
                    {formatDate(supplier.createdAt)}
                  </p>
                </div>
              </div>

              {supplier.updatedAt && supplier.updatedAt !== supplier.createdAt && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F0F2F5] flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-[#6D7A87]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#6D7A87]">Останнє оновлення</p>
                    <p className="text-base text-[#3A4754] font-medium">
                      {formatDate(supplier.updatedAt)}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <SupplierSheet />
    </div>
  );
}
