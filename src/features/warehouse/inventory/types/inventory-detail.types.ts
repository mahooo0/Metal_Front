export interface InventoryDetailItem {
  id: string;
  productName: string;
  sheetFormat: string;
  shouldBe: string;
  actualAvailability: string;
  deficitRemainder: string;
  metalAmountInStock: string;
  deliveryWeight: string;
  costPerTon: string;
  comment: string;
}

export interface InventoryDetailColumn {
  key: keyof InventoryDetailItem;
  label: string;
  visible: boolean;
  sortable: boolean;
  width?: string;
  type: "text" | "number" | "date" | "select";
  options?: { value: string; label: string }[];
  render?: (value: any, row: InventoryDetailItem) => React.ReactNode;
}
