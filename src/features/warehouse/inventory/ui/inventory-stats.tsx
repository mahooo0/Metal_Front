import React from "react";

import { Check, Minus, TrendingDown, TrendingUp, X } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { InfoBar } from "@/shared/ui/info-bar";

interface InventoryStatsProps {
  deficit?: {
    units: number;
    amount: number;
  };
  surplus?: {
    units: number;
    amount: number;
  };
  difference?: {
    amount: number;
  };
  showActions?: boolean;
  onApprove?: () => void;
  onReject?: () => void;
  isApproving?: boolean;
  isRejecting?: boolean;
}

export function InventoryStats({
  deficit = { units: 0, amount: 0 },
  surplus = { units: 0, amount: 0 },
  difference = { amount: 0 },
  showActions = false,
  onApprove,
  onReject,
  isApproving = false,
  isRejecting = false,
}: InventoryStatsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("uk-UA", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="flex gap-4 mb-5 w-full">
      <div className="flex-1">
        <InfoBar
          icon={<TrendingDown className="w-4 h-4 text-gray-600" />}
          title={`Нестача: ${deficit.units} одиниць`}
          value={formatCurrency(deficit.amount)}
        />
      </div>
      <div className="flex-1">
        <InfoBar
          icon={<TrendingUp className="w-4 h-4 text-gray-600" />}
          title={`Надлишок: ${surplus.units} одиниць`}
          value={formatCurrency(surplus.amount)}
        />
      </div>
      <div className="flex-1">
        <InfoBar
          icon={<Minus className="w-4 h-4 text-gray-600" />}
          title="Різниця"
          value={formatCurrency(difference.amount)}
        />
      </div>

      {showActions && (
        <div className="flex items-center flex-col gap-2">
          <Button
            variant="balck"
            size="lg"
            className="w-full min-w-[200px]"
            onClick={onReject}
            disabled={isRejecting}>
            <X className="w-4 h-4 mr-2" />
            Відхилити
          </Button>
          <Button
            variant="BlackTransparent"
            size="lg"
            className="w-full min-w-[200px]"
            onClick={onApprove}
            disabled={isApproving}>
            <Check className="w-4 h-4 mr-2" />
            {isApproving ? "Затвердження..." : "Затвердити"}
          </Button>
        </div>
      )}
    </div>
  );
}
