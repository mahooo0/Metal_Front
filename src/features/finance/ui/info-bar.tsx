import React from "react";

import {
  BarChart3,
  CheckCircle,
  CreditCard,
  Presentation,
  TrendingDown,
} from "lucide-react";

import InfoCard from "./info-card";

export default function InfoBar() {
  return (
    <div className="grid grid-cols-5 gap-6 pb-4">
      <InfoCard
        icon={<BarChart3 className="w-6 h-6 text-white" />}
        title="Усього:"
        value="146900 грн"
      />
      <InfoCard
        icon={<CreditCard className="w-6 h-6 text-white" />}
        title="Заплачено"
        value="146900 грн"
      />
      <InfoCard
        icon={<CheckCircle className="w-6 h-6 text-white" />}
        title="Очікується"
        value="146900 грн"
      />
      <InfoCard
        icon={<TrendingDown className="w-6 h-6 text-white" />}
        title="Витрати"
        value="146900 грн"
      />
      <InfoCard
        icon={<Presentation className="w-6 h-6 text-white" />}
        title="Прибуток"
        value="146900 грн"
      />
    </div>
  );
}
