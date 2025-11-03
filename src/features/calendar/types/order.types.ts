export interface Order {
  id: string;
  createdDate: string;
  endDate: string;
  customer: string;
  orderNumber: string;
  performers: Performer[];
  status: OrderStatus;
}

export interface Performer {
  id: string;
  name: string;
  avatar?: string;
  initials?: string;
}

export type OrderStatus =
  | "На розгляді"
  | "В процесі"
  | "Завершено"
  | "Скасовано";

export interface OrderCardProps {
  order: Order;
  onViewOrder: (order: Order) => void;
}
