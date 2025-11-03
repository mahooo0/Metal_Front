export type PurchaseStatus =
  | "У процесі"
  | "На розгляді"
  | "Планування"
  | "Прорахунок"
  | "Запуск";

export interface PurchaseItem {
  id: string;
  date: string;
  idNumber: string;
  quantity: string;
  amount: string;
  status: PurchaseStatus;
  supplier: string;
  comment: string;
}

export interface PurchaseColumn {
  key: keyof PurchaseItem;
  label: string;
  visible: boolean;
  sortable: boolean;
  width?: string;
  type: "text" | "number" | "date";
  render?: (value: any, item: PurchaseItem) => React.ReactNode;
}
