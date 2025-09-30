import React from "react";

import cardRecive from "../../../public/card-recive.svg";
import moneyRecive from "../../../public/money-recive.svg";
import statusUp from "../../../public/status-up.svg";
import walet from "../../../public/walet.svg";
import FinanceCard from "./finance-card";
import TotalFinanceCard from "./total-finance-card";

export default function InfoBar() {
  return (
    <div className="grid grid-cols-2 gap-6 mt-5">
      <TotalFinanceCard />
      <div className="grid grid-cols-2 gap-6 grid-rows-2">
        <FinanceCard
          icon={walet.src}
          title="Загальна вартість робіт"
          amount="80678 грн"
          percentage="-4,7%"
          isUp={false}
        />
        <FinanceCard
          icon={moneyRecive.src}
          title="Очікується"
          amount="80678 грн"
          percentage="+3,0%"
          isUp={true}
        />
        <FinanceCard
          icon={cardRecive.src}
          title="Загальні витрати"
          amount="80678 грн"
          percentage="-3,0%"
          isUp={false}
        />
        <FinanceCard
          icon={statusUp.src}
          title="Прибуток"
          amount="80678 грн"
          percentage="+3,0%"
          isUp={true}
        />
      </div>
    </div>
  );
}
