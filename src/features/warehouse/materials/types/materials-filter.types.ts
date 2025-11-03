export interface MaterialsFilterData {
  search: string;
  category: string;
  type: string;
  thickness: string;
  minimumBalance: string;
  sheetType: string;
  showBalances: boolean;
}

export interface MaterialsFilterProps {
  onApply: (data: MaterialsFilterData) => void;
  onReset: () => void;
  initialData?: Partial<MaterialsFilterData>;
}
