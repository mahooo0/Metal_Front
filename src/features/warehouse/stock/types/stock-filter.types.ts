export interface StockFilterData {
  search: string;
  material: string;
  size: string;
}

export interface StockFilterProps {
  onApply: (data: StockFilterData) => void;
  onReset: () => void;
  initialData?: Partial<StockFilterData>;
}
