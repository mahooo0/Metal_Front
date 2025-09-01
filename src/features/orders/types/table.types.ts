export interface OrderTableItem {
  id: string;
  date: string;
  orderNumber: string;
  counterparty: string;
  responsible: string;
  calculationDate: string;
  endDate: string;
  status: OrderStatus;
}

export type OrderStatus =
  | "planning"
  | "in-progress"
  | "calculation"
  | "under-review"
  | "launch"
  | "pause";

export interface OrderTableColumn {
  key: keyof OrderTableItem;
  label: string;
  sortable?: boolean;
  width?: string;
}
