import { DataTableColumn } from "@/shared/ui/data-table";

export interface MaterialItemTableRow {
  id: string;
  name: string;
  thickness: number;
  typeId: string;
  typeName: string;
  sheetType: string;
  cuttingSupply?: number;
  cuttingTime?: number;
  description?: string;
  createdAt: string;
}

export type MaterialItemColumn = DataTableColumn<MaterialItemTableRow> & {
  visible: boolean;
};
