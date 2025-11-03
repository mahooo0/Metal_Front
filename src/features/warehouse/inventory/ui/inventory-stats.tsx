import React from "react";

import { Minus, TrendingDown, TrendingUp } from "lucide-react";

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
}

export function InventoryStats({
  deficit = { units: 28, amount: 146900 },
  surplus = { units: 0, amount: 0 },
  difference = { amount: -146900 },
}: InventoryStatsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("uk-UA", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="flex gap-4 mb-5  w-full grid grid-cols-3">
      <InfoBar
        icon={<TrendingDown className="w-4 h-4 text-gray-600" />}
        title={`Нестача: ${deficit.units} одиниць`}
        value={formatCurrency(deficit.amount)}
      />
      <InfoBar
        icon={<TrendingUp className="w-4 h-4 text-gray-600" />}
        title={`Надлишок: ${surplus.units} одиниць`}
        value={formatCurrency(surplus.amount)}
      />
      <InfoBar
        icon={<Minus className="w-4 h-4 text-gray-600" />}
        title="Різниця"
        value={formatCurrency(difference.amount)}
      />
    </div>
  );
}
