import type { Material, PriceCategories } from "@/service/materials.service";

export type MaterialStatus =
  | "IN_PROCESS"
  | "UNDER_REVIEW"
  | "PLANNING"
  | "CALCULATION"
  | "LAUNCH";

export type { PriceCategories };

// Тип для строки таблицы с плоской структурой
export interface MaterialTableRow {
  id: string;
  date: string;
  createdAt: string;
  materialItemName: string;
  thickness: number;
  type: string;
  sheetType: string;
  supplierName: string;
  width: number;
  length: number;
  quantity: number;
  status: MaterialStatus;
  priceOver100: number;
  priceFrom50to100: number;
  priceFrom10to50: number;
  priceFrom10: number;
  comment: string;
}

export interface MaterialColumn {
  key: keyof MaterialTableRow;
  label: string;
  visible: boolean;
  sortable: boolean;
  width?: string;
  type: "text" | "number" | "date";
  render?: (value: unknown, item: MaterialTableRow) => React.ReactNode;
}

// Функция маппинга Material -> MaterialTableRow
export function mapMaterialToTableRow(material: Material): MaterialTableRow {
  return {
    id: material.id,
    date: material.date,
    createdAt: material.createdAt,
    materialItemName: material.materialItem?.name || "",
    thickness: material.materialItem?.thickness || 0,
    type: material.materialItem?.type?.name || "",
    sheetType: material.materialItem?.sheetType || "",
    supplierName: material.supplier?.name || "",
    width: material.width || 0,
    length: material.length || 0,
    quantity: material.quantity,
    status: material.status,
    priceOver100: material.priceCategories?.over100 || 0,
    priceFrom50to100: material.priceCategories?.from50to100 || 0,
    priceFrom10to50: material.priceCategories?.from10to50 || 0,
    priceFrom10: material.priceCategories?.from10 || 0,
    comment: material.comment || "",
  };
}
