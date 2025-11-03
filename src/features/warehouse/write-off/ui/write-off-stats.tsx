import React from "react";

import { TrendingUp } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { InfoBar } from "@/shared/ui/info-bar";

interface WriteOffStatsProps {
  quantity?: {
    units: number;
  };
  amount?: {
    value: number;
  };
  onWriteOff?: () => void;
  onContinueLater?: () => void;
}

export function WriteOffStats({
  quantity = { units: 2039 },
  amount = { value: 396840797 },
  onWriteOff,
  onContinueLater,
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
      {/* Stats Cards */}
      <div className="grid grid-cols-10 gap-4 w-full">
        <div className="grid grid-cols-2 col-span-8 gap-4">
          <InfoBar
            icon={<TrendingUp className="w-4 h-4 text-gray-600" />}
            title="Кількість"
            value={`${quantity.units} одиниць`}
            className="min-w-[200px]"
          />
          <InfoBar
            icon={<TrendingUp className="w-4 h-4 text-gray-600" />}
            title="Сума"
            value={formatCurrency(amount.value)}
            className="min-w-[250px]"
          />
        </div>
        <div className="flex flex-col gap-2 col-span-2">
          <Button variant="balck" size="lg" onClick={onWriteOff}>
            Списати
          </Button>
          <Button
            variant="BlackTransparent"
            size="lg"
            onClick={onContinueLater}>
            Продовжити пізніше
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
    </div>
  );
}
