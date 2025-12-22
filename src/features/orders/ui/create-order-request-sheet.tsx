"use client";

import React, { useState, useEffect } from "react";

import Image from "next/image";

import { useCounterparties } from "@/hooks/use-counterparties";
import { useCreateOrderRequest } from "@/hooks/use-create-order-request";
import { useOrderRequestById } from "@/hooks/use-order-request-by-id";
import { useUpdateOrderRequest } from "@/hooks/use-update-order-request";
import { OrderRequestStatus } from "@/features/orders/types/order-request.types";
import order from "@/public/order.svg";
import { ArrowLeft } from "lucide-react";
import { useQueryState } from "nuqs";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
} from "@/shared/ui/sheet";
import { Textarea } from "@/shared/ui/textarea";

import { DateRangePicker } from "./date-range-picker";
import { OrderTypeSelect } from "./order-type-select";

interface CreateOrderRequestSheetProps {
  orderId?: string;
}

export function CreateOrderRequestSheet({ orderId }: CreateOrderRequestSheetProps) {
  const [createOrder, setCreateOrder] = useQueryState("createOrder", {
    defaultValue: "false",
  });
  const [editOrderId, setEditOrderId] = useQueryState("editOrder", {
    defaultValue: "",
  });

  const isEditMode = !!orderId || !!editOrderId;
  const currentOrderId = orderId || editOrderId;

  const createMutation = useCreateOrderRequest();
  const updateMutation = useUpdateOrderRequest();
  const { counterparties, isLoading: isLoadingCounterparties } =
    useCounterparties();
  const { orderRequest, isLoading: isLoadingOrder } = useOrderRequestById(
    currentOrderId,
    isEditMode && createOrder === "true"
  );

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    indexLike: "",
    orderTypeId: "",
    counterpartyId: "",
    status: "NEW_ORDER" as OrderRequestStatus,
    dateRange: {
      from: undefined as Date | undefined,
      to: undefined as Date | undefined,
    },
  });

  // Load data when editing
  useEffect(() => {
    if (isEditMode && orderRequest && createOrder === "true") {
      setFormData({
        title: orderRequest.title || "",
        description: orderRequest.description || "",
        indexLike: orderRequest.indexLike || "",
        orderTypeId: orderRequest.orderTypeId || "",
        counterpartyId: orderRequest.counterpartyId || "",
        status: orderRequest.status || "NEW_ORDER",
        dateRange: {
          from: orderRequest.startTime ? new Date(orderRequest.startTime) : undefined,
          to: orderRequest.endTime ? new Date(orderRequest.endTime) : undefined,
        },
      });
    }
  }, [isEditMode, orderRequest, createOrder]);

  const handleInputChange = (
    field: string,
    value: string | OrderRequestStatus | { from?: Date; to?: Date }
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.orderTypeId ||
      !formData.counterpartyId
    ) {
      return;
    }

    const startTimeISO = formData.dateRange.from
      ? formData.dateRange.from.toISOString()
      : new Date().toISOString();
    const endTimeISO = formData.dateRange.to
      ? formData.dateRange.to.toISOString()
      : formData.dateRange.from
        ? formData.dateRange.from.toISOString()
        : new Date().toISOString();

    if (isEditMode && currentOrderId) {
      updateMutation.mutate(
        {
          id: currentOrderId,
          data: {
            title: formData.title.trim(),
            description: formData.description.trim(),
            orderTypeId: formData.orderTypeId,
            counterpartyId: formData.counterpartyId,
            startTime: startTimeISO,
            endTime: endTimeISO,
            status: formData.status,
          },
        },
        {
          onSuccess: () => {
            setFormData({
              title: "",
              description: "",
              indexLike: "",
              orderTypeId: "",
              counterpartyId: "",
              status: "NEW_ORDER",
              dateRange: { from: undefined, to: undefined },
            });
            setCreateOrder("false");
            setEditOrderId("");
          },
        }
      );
    } else {
      createMutation.mutate(
        {
          title: formData.title.trim(),
          description: formData.description.trim(),
          indexLike: formData.indexLike.trim(),
          orderTypeId: formData.orderTypeId,
          counterpartyId: formData.counterpartyId,
          startTime: startTimeISO,
          endTime: endTimeISO,
        },
        {
          onSuccess: () => {
            setFormData({
              title: "",
              description: "",
              indexLike: "",
              orderTypeId: "",
              counterpartyId: "",
              status: "NEW_ORDER",
              dateRange: { from: undefined, to: undefined },
            });
            setCreateOrder("false");
          },
        }
      );
    }
  };

  const handleClose = () => {
    if (!createMutation.isPending && !updateMutation.isPending) {
      setFormData({
        title: "",
        description: "",
        indexLike: "",
        orderTypeId: "",
        counterpartyId: "",
        status: "NEW_ORDER",
        dateRange: { from: undefined, to: undefined },
      });
      setCreateOrder("false");
      setEditOrderId("");
    }
  };

  return (
    <Sheet
      open={createOrder === "true"}
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
                disabled={createMutation.isPending || updateMutation.isPending || isLoadingOrder}>
                <ArrowLeft /> Назад
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="flex items-center gap-2">
            <Image src={order} width={36} height={36} alt="logo" />
            <h2 className="text-[24px] text-[#3A4754] font-bold">
              {isEditMode ? "Редагування замовлення" : "Створення нового замовлення"}
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-5">
            <div className="grid gap-2">
              <Label
                htmlFor="title"
                className="text-sm text-[#3A4754] font-medium">
                Назва замовлення
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={e => handleInputChange("title", e.target.value)}
                placeholder="Введіть назву замовлення"
                className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label
                htmlFor="description"
                className="text-sm text-[#3A4754] font-medium">
                Опис замовлення
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={e => handleInputChange("description", e.target.value)}
                placeholder="Введіть опис замовлення"
                className="min-h-[120px] w-full rounded-[16px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
              />
            </div>

            {!isEditMode && (
              <div className="grid gap-2">
                <Label
                  htmlFor="indexLike"
                  className="text-sm text-[#3A4754] font-medium">
                  Номер замовлення
                </Label>
                <Input
                  id="indexLike"
                  value={formData.indexLike}
                  onChange={e => handleInputChange("indexLike", e.target.value)}
                  placeholder="Введіть номер замовлення"
                  className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
                />
              </div>
            )}

            <div className="grid gap-2">
              <Label className="text-sm text-[#3A4754] font-medium">
                Тип замовлення
              </Label>
              <OrderTypeSelect
                value={formData.orderTypeId}
                onValueChange={value => handleInputChange("orderTypeId", value)}
                placeholder="Оберіть тип замовлення"
              />
            </div>

            <div className="grid gap-2">
              <Label className="text-sm text-[#3A4754] font-medium">
                Контрагент
              </Label>
              <Select
                value={formData.counterpartyId}
                onValueChange={value =>
                  handleInputChange("counterpartyId", value)
                }>
                <SelectTrigger className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
                  <SelectValue placeholder="Оберіть контрагента" />
                </SelectTrigger>
                <SelectContent>
                  {isLoadingCounterparties ? (
                    <div className="p-4 text-center text-sm text-[#B6BDC3]">
                      Завантаження...
                    </div>
                  ) : counterparties.length === 0 ? (
                    <div className="p-4 text-center text-sm text-[#B6BDC3]">
                      Немає контрагентів
                    </div>
                  ) : (
                    counterparties.map(counterparty => (
                      <SelectItem key={counterparty.id} value={counterparty.id}>
                        {counterparty.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label className="text-sm text-[#3A4754] font-medium">
                Період виконання
              </Label>
              <DateRangePicker
                value={formData.dateRange}
                onChange={range => handleInputChange("dateRange", range)}
                placeholder="Оберіть період виконання"
              />
            </div>

            {isEditMode && (
              <div className="grid gap-2">
                <Label className="text-sm text-[#3A4754] font-medium">
                  Статус
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={value =>
                    handleInputChange("status", value as OrderRequestStatus)
                  }>
                  <SelectTrigger className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
                    <SelectValue placeholder="Оберіть статус" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NEW_ORDER">Нове замовлення</SelectItem>
                    <SelectItem value="CALCULATION">Прорахунок</SelectItem>
                    <SelectItem value="CLARIFICATION">Уточнення</SelectItem>
                    <SelectItem value="EXTRA_SERVICES">Додаткові послуги</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </form>
        </div>
        <SheetFooter className="flex items-center justify-between flex-row gap-6">
          <SheetClose asChild className="w-1/2">
            <Button
              variant="BlackTransparent"
              size="lg"
              onClick={handleClose}
              disabled={createMutation.isPending}>
              Відхилити
            </Button>
          </SheetClose>
          <Button
            type="submit"
            variant="balck"
            size="lg"
            className="w-1/2"
            onClick={handleSubmit}
            disabled={
              createMutation.isPending ||
              updateMutation.isPending ||
              isLoadingOrder ||
              !formData.title.trim() ||
              !formData.orderTypeId ||
              !formData.counterpartyId
            }>
            {createMutation.isPending || updateMutation.isPending
              ? isEditMode
                ? "Збереження..."
                : "Створення..."
              : isEditMode
                ? "Зберегти"
                : "Створити"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
