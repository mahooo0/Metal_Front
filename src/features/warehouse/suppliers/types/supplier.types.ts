export interface SupplierItem {
  id: string;
  creationDate: string;
  name: string;
  supplierId: string;
  contacts: string;
}

export interface SupplierColumn {
  key: keyof SupplierItem;
  label: string;
  visible: boolean;
  sortable?: boolean;
  width?: string;
  type?: "text" | "date" | "select" | "number";
}

export interface SuppliersTableProps {
  data?: SupplierItem[];
  onSaveRow?: (row: SupplierItem) => void;
  onPageChange?: (page: number) => void;
  currentPage?: number;
  totalPages?: number;
}
