export interface InventoryItem {
  id: string;
  date: string;
  idNumber: string;
  actualAvailability: string;
  actualWeight: string;
  deficiencyRemainder: string;
  metalAmountInStock: string;
  comment: string;
}

export interface InventoryColumn {
  key: keyof InventoryItem;
  label: string;
  visible: boolean;
  sortable: boolean;
  width?: string;
  type: "text" | "number" | "date";
}
