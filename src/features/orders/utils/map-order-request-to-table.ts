import { OrderRequest, OrderRequestStatus } from "../types/order-request.types";
import { OrderTableItem, OrderStatus } from "../types/table.types";

const statusMap: Record<OrderRequestStatus, OrderStatus> = {
  NEW_ORDER: "planning",
  CALCULATION: "calculation",
  CLARIFICATION: "under-review",
  EXTRA_SERVICES: "in-progress",
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export function mapOrderRequestToTableItem(
  orderRequest: OrderRequest
): OrderTableItem {
  return {
    id: orderRequest.id,
    date: formatDate(orderRequest.createdAt),
    orderNumber: orderRequest.indexLike,
    counterparty: orderRequest.counterparty.name,
    responsible: orderRequest.createdBy.displayName,
    calculationDate: formatDate(orderRequest.startTime),
    endDate: formatDate(orderRequest.endTime),
    status: statusMap[orderRequest.status] || "planning",
  };
}

