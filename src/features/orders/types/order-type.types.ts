export interface OrderType {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderTypeDto {
  name: string;
}

export interface UpdateOrderTypeDto {
  name: string;
}

