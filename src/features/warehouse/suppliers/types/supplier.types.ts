export type {
  Supplier,
  SupplierContact,
  SuppliersQuery,
  CreateSupplierDto,
  UpdateSupplierDto,
  CreateSupplierContactDto,
} from "@/service/suppliers.service";

export interface SupplierTableRow {
  id: string;
  name: string;
  edrpou: string;
  ipn: string;
  legalAddress: string;
  contactsCount: number;
  createdAt: string;
}

export interface SupplierColumn {
  key: keyof SupplierTableRow;
  label: string;
  visible: boolean;
  sortable?: boolean;
  width?: string;
  type?: "text" | "date" | "select" | "number";
}

export interface SuppliersTableProps {
  data?: SupplierTableRow[];
  currentPage?: number;
  totalPages?: number;
  total?: number;
  onPageChange?: (page: number) => void;
  onEditRow?: (row: SupplierTableRow) => void;
  onDeleteRow?: (row: SupplierTableRow) => void;
  isLoading?: boolean;
}
