import type { PurchaseStatus } from "./purchase.types";

export interface PurchaseFilterData {
  search: string;
  supplierId: string;
  status: PurchaseStatus | "";
  dateFrom: string;
  dateTo: string;
  sortBy: "date" | "totalAmount" | "status" | "createdAt" | "";
  sortOrder: "asc" | "desc" | "";
}

export interface PurchaseFilterProps {
  filterData: PurchaseFilterData;
  onFilterChange: (data: PurchaseFilterData) => void;
  onReset: () => void;
  isLoading?: boolean;
}

export const initialPurchaseFilterData: PurchaseFilterData = {
  search: "",
  supplierId: "",
  status: "",
  dateFrom: "",
  dateTo: "",
  sortBy: "",
  sortOrder: "",
};
