export interface StockItem {
  id: string;
  deliveryDate: string;
  productName: string;
  size: string;
  quantity: string;
  actualWeight: string;
  metalAmount: string;
  costPerTon: string;
}

export interface StockColumn {
  key: keyof StockItem;
  label: string;
  visible: boolean;
  sortable: boolean;
  width?: string;
  type: "text" | "number" | "date";
}
