export interface WriteOffItem {
  id: string;
  deliveryDate: string;
  writeOffId: string;
  quantity: string;
  weight: string;
  amount: string;
  comment: string;
}

export interface WriteOffColumn {
  key: keyof WriteOffItem;
  label: string;
  visible: boolean;
  sortable: boolean;
  width?: string;
  type: "text" | "number" | "date";
}
