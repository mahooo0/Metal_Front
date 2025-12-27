export interface AddItemsFilterData {
  search: string;
  materialType: string;
}

export interface AddItemsFilterProps {
  filterData: AddItemsFilterData;
  onSearchChange: (value: string) => void;
  onMaterialTypeChange: (value: string) => void;
  onReset: () => void;
}

export const initialAddItemsFilterData: AddItemsFilterData = {
  search: "",
  materialType: "",
};

