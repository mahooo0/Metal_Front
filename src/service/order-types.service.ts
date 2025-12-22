import { api } from "@/shared/api";

import {
  OrderType,
  CreateOrderTypeDto,
  UpdateOrderTypeDto,
} from "@/features/orders/types/order-type.types";

class OrderTypesService {
  public list() {
    return api.get<OrderType[]>("order-types");
  }

  public create(data: CreateOrderTypeDto) {
    return api.post<OrderType>("order-types", data);
  }

  public update(id: string, data: UpdateOrderTypeDto) {
    return api.put<OrderType>(`order-types/${id}`, data);
  }

  public delete(id: string) {
    return api.delete<void>(`order-types/${id}`);
  }
}

export const orderTypesService = new OrderTypesService();

