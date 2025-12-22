import { DataTableColumn } from "@/shared/ui/data-table";

export interface MaterialCategoryItem {
  id: string;
  name: string;
  createdAt: string;
}

export type MaterialCategoryColumn = DataTableColumn<MaterialCategoryItem> & {
  visible: boolean;
};
