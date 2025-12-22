import type { Purchase } from "@/service/purchases.service";

export type PurchaseStatus =
  | "IN_PROCESS"
  | "UNDER_REVIEW"
  | "PLANNING"
  | "CALCULATION"
  | "LAUNCH"
  | "RECEIVED";

export interface PurchaseTableRow {
  id: string;
  date: string;
  purchaseId: string;
  supplierName: string;
  supplierId: string;
  totalAmount: number;
  status: PurchaseStatus;
  comment: string;
  createdAt: string;
}

export interface PurchaseColumn {
  key: keyof PurchaseTableRow;
  label: string;
  visible: boolean;
  sortable: boolean;
  width?: string;
  type: "text" | "number" | "date";
  render?: (value: unknown, item: PurchaseTableRow) => React.ReactNode;
}

export function mapPurchaseToTableRow(purchase: Purchase): PurchaseTableRow {
  return {
    id: purchase.id,
    date: purchase.date,
    purchaseId: purchase.purchaseId,
    supplierName: purchase.supplier?.name || "",
    supplierId: purchase.supplierId,
    totalAmount: purchase.totalAmount,
    status: purchase.status,
    comment: purchase.comment || "",
    createdAt: purchase.createdAt,
  };
}
