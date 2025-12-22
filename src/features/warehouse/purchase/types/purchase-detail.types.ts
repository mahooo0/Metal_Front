import { PurchaseItem, PurchaseItemStatus } from "@/service/purchase-items.service";

export type { PurchaseItemStatus } from "@/service/purchase-items.service";

export interface PurchaseDetailTableRow {
  id: string;
  productName: string;
  thickness: string;
  type: string;
  sheetType: string;
  dimensions: string;
  orderedQuantity: number;
  receivedQuantity: number;
  purchasePrice: number;
  salePrice: number;
  status: PurchaseItemStatus;
  materialItemId: string;
}

export interface PurchaseDetailColumn {
  key: keyof PurchaseDetailTableRow;
  label: string;
  visible: boolean;
  sortable: boolean;
  width?: string;
  type: "text" | "number" | "status" | "editable";
  render?: (value: unknown, item: PurchaseDetailTableRow) => React.ReactNode;
}

export function mapPurchaseItemToTableRow(item: PurchaseItem): PurchaseDetailTableRow {
  const materialItem = item.materialItem;

  return {
    id: item.id,
    productName: materialItem?.name || "-",
    thickness: materialItem?.thickness ? `${materialItem.thickness} мм` : "-",
    type: materialItem?.type?.name || "-",
    sheetType: materialItem?.sheetType || "-",
    dimensions: item.dimensions || `${item.width}x${item.length}`,
    orderedQuantity: item.orderedQuantity,
    receivedQuantity: item.receivedQuantity,
    purchasePrice: item.purchasePrice,
    salePrice: item.salePrice,
    status: item.status,
    materialItemId: item.materialItemId,
  };
}
