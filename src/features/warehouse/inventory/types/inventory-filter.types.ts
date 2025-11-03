export interface InventoryFilterData {
  search: string;
  period: string;
}

export interface InventoryFilterProps {
  onApply: (data: InventoryFilterData) => void;
  onReset: () => void;
  initialData?: Partial<InventoryFilterData>;
}
