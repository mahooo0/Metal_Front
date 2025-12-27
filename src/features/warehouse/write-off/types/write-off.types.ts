import { WriteOffStatus } from "@/service/write-offs.service";

export interface WriteOffTableRow {
  id: string;
  writeOffNumber: string;
  date: string;
  status: WriteOffStatus;
  totalQuantity: number;
  totalAmount: number;
  itemsCount: number;
  comment?: string;
  createdAt: string;
}

export interface WriteOffColumn {
  key: keyof WriteOffTableRow;
  label: string;
  visible: boolean;
  sortable: boolean;
  width?: string;
  type: "text" | "number" | "date" | "status";
}
