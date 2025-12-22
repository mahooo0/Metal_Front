import { OrderRequest } from "../types/order-request.types";
import { Card } from "../types";

export function mapOrderRequestToCard(orderRequest: OrderRequest): Card {
  return {
    id: orderRequest.id,
    title: orderRequest.title,
    subtitle: orderRequest.description,
    companyName: orderRequest.counterparty.name,
    orderId: orderRequest.indexLike || orderRequest.id,
    createdAt: orderRequest.createdAt,
    completedAt: orderRequest.endTime,
    assignedUsers: orderRequest.createdBy
      ? [
          {
            id: orderRequest.createdBy.id,
            name: orderRequest.createdBy.displayName,
            avatar: "", // Можно добавить аватар позже
          },
        ]
      : undefined,
  };
}

