import type { MaterialStatus } from "./materials.types";

export interface MaterialsFilterData {
  search: string;
  status: MaterialStatus | "";
  sortBy: "quantity" | "createdAt" | "updatedAt" | "";
  sortOrder: "asc" | "desc" | "";
}

export interface MaterialsFilterProps {
  filterData: MaterialsFilterData;
  onFilterChange: (data: MaterialsFilterData) => void;
  onReset: () => void;
  isLoading?: boolean;
}
