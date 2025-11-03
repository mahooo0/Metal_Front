export interface AddProductFilterData {
  showRemnants: "all" | "nonActual";
  category: string;
  productType: string;
  search: string;
}

export interface AddProductFilterProps {
  onApply: (data: AddProductFilterData) => void;
  onReset: () => void;
  initialData?: Partial<AddProductFilterData>;
}
