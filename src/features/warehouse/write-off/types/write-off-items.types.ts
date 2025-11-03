export interface WriteOffItem {
  id: string;
  deliveryDate: string;
  productName: string;
  size: string;
  quantity: number;
  actualWeight: string | number;
  metalAmount: number;
  costPerTon: number;
}

export interface WriteOffItemColumn {
  key: keyof WriteOffItem;
  label: string;
  visible: boolean;
  sortable: boolean;
  width?: string;
  type: "text" | "number" | "date";
}

