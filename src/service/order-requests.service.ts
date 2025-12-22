import {
  OrderRequest,
  OrderRequestsResponse,
} from "@/features/orders/types/order-request.types";

import { api } from "@/shared/api";

export interface CreateOrderRequestDto {
  title: string;
  description: string;
  indexLike: string;
  orderTypeId: string;
  counterpartyId: string;
  startTime: string;
  endTime: string;
}

export interface UpdateOrderRequestDto {
  title: string;
  description: string;
  orderTypeId: string;
  counterpartyId: string;
  startTime: string;
  endTime: string;
  status: string;
}

export interface OrderRequestsQuery {
  page?: number;
  limit?: number;
}

class OrderRequestsService {
  public getOrders(params: OrderRequestsQuery = { page: 1, limit: 20 }) {
    return api.get<OrderRequestsResponse>("order-requests", {
      params: {
        page: params.page ?? 1,
        limit: params.limit ?? 20,
      },
    });
  }

  public getOrdersByStatus(status: string) {
    return api.get<OrderRequestsResponse>("order-requests", {
      params: {
        status,
      },
    });
  }

  public getById(id: string) {
    return api.get<OrderRequest>(`order-requests/${id}`);
  }

  public create(data: CreateOrderRequestDto) {
    return api.post("order-requests", data);
  }

  public update(id: string, data: UpdateOrderRequestDto) {
    return api.put(`order-requests/${id}`, data);
  }

  public delete(id: string) {
    return api.delete<void>(`order-requests/${id}`);
  }

  public updateStatus(id: string, status: string) {
    return api.patch(`order-requests/${id}/status`, { status });
  }
}

export const orderRequestsService = new OrderRequestsService();
