import React from "react";

import { Package, TrendingUp } from "lucide-react";

import { WriteOffStatus } from "@/service/write-offs.service";

import { Button } from "@/shared/ui/button";
import { InfoBar } from "@/shared/ui/info-bar";

interface WriteOffStatsProps {
  totalQuantity: number;
  totalAmount: number;
  itemsCount: number;
  status: WriteOffStatus;
  onSubmit?: () => void;
  onContinueLater?: () => void;
  onApprove?: () => void;
  onReject?: () => void;
  isSubmitting?: boolean;
  isApproving?: boolean;
  isRejecting?: boolean;
}

export function WriteOffStats({
  totalQuantity,
  totalAmount,
  itemsCount,
  status,
  onSubmit,
  onContinueLater,
  onApprove,
  onReject,
  isSubmitting = false,
  isApproving = false,
  isRejecting = false,
}: WriteOffStatsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("uk-UA", {
      style: "currency",
      currency: "UAH",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="flex items-center justify-between gap-4 mb-5">
      <div className="grid grid-cols-10 gap-4 w-full">
        <div className="grid grid-cols-3 col-span-8 gap-4">
          <InfoBar
            icon={<Package className="w-4 h-4 text-gray-600" />}
            title="Позицій до списання"
            value={`${itemsCount} шт`}
            className="min-w-[200px]"
          />
          <InfoBar
            icon={<TrendingUp className="w-4 h-4 text-gray-600" />}
            title="Загальна кількість"
            value={`${totalQuantity} одиниць`}
            className="min-w-[200px]"
          />
          <InfoBar
            icon={<TrendingUp className="w-4 h-4 text-gray-600" />}
            title="Загальна сума"
            value={formatCurrency(totalAmount)}
            className="min-w-[250px]"
          />
        </div>
        <div className="flex flex-col gap-2 col-span-2">
          {status === "DRAFT" && (
            <>
              <Button
                variant="balck"
                size="lg"
                onClick={onSubmit}
                disabled={isSubmitting || itemsCount === 0}>
                {isSubmitting ? "Обробка..." : "Списати"}
              </Button>
              <Button
                variant="BlackTransparent"
                size="lg"
                onClick={onContinueLater}
                disabled={isSubmitting}>
                Продовжити пізніше
              </Button>
            </>
          )}
          {status === "PENDING" && (
            <>
              <Button
                variant="balck"
                size="lg"
                onClick={onApprove}
                disabled={isApproving || isRejecting}>
                {isApproving ? "Обробка..." : "Прийняти"}
              </Button>
              <Button
                variant="BlackTransparent"
                size="lg"
                onClick={onReject}
                disabled={isApproving || isRejecting}>
                {isRejecting ? "Обробка..." : "Відхилити"}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
