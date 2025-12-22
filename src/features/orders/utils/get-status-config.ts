import { OrderRequestStatus } from "../types/order-request.types";

export interface StatusConfig {
  label: string;
  bgColor: string;
  textColor: string;
}

export const ORDER_STATUS_CONFIG: Record<OrderRequestStatus, StatusConfig> = {
  NEW_ORDER: {
    label: "Нове замовлення",
    bgColor: "bg-[#D8F6FE]",
    textColor: "text-[#30B2D5]",
  },
  CALCULATION: {
    label: "Прорахунок",
    bgColor: "bg-[#D7F6EE]",
    textColor: "text-[#64C4AA]",
  },
  CLARIFICATION: {
    label: "Уточнення",
    bgColor: "bg-[#F8D1FC]",
    textColor: "text-[#CE70D8]",
  },
  EXTRA_SERVICES: {
    label: "Додаткові послуги",
    bgColor: "bg-[#D3CEFB]",
    textColor: "text-[#6C5BF2]",
  },
};

export function getStatusConfig(status: OrderRequestStatus): StatusConfig {
  return ORDER_STATUS_CONFIG[status] || ORDER_STATUS_CONFIG.NEW_ORDER;
}

