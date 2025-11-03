export interface AddItemsFilterData {
  search: string;
  material: string;
  size: string;
}

export interface AddItemsFilterProps {
  onApply: (data: AddItemsFilterData) => void;
  onReset: () => void;
  initialData?: AddItemsFilterData;
}

