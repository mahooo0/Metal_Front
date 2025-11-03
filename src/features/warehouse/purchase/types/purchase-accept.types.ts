export interface PurchaseAcceptItem {
  id: string;
  productName: string;
  thickness: string;
  type: string;
  size: string;
  expected: string;
  received: string;
  purchasePrice: string;
  salePrice: string;
  costAmount: string;
}

export interface PurchaseAcceptColumn {
  key: keyof PurchaseAcceptItem;
  label: string;
  visible: boolean;
  sortable: boolean;
  width?: string;
  type: "text" | "number";
}
