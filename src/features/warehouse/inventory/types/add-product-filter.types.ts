export interface AddProductFilterData {
  sortOrder: "filled_first" | "empty_first";
  search: string;
}

export interface AddProductFilterProps {
  filterData: AddProductFilterData;
  onSortChange: (sortOrder: AddProductFilterData["sortOrder"]) => void;
  onSearchChange: (search: string) => void;
  onReset: () => void;
}
