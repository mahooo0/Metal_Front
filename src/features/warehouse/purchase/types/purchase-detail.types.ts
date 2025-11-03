export interface PurchaseDetailItem {
  id: string;
  productName: string;
  thickness: string;
  type: string;
  size: string;
  expected: string;
  purchasePrice: string;
  salePrice: string;
  costAmount: string;
}

export interface PurchaseDetailColumn {
  key: keyof PurchaseDetailItem;
  label: string;
  visible: boolean;
  sortable: boolean;
  width?: string;
  type: "text" | "number";
}
