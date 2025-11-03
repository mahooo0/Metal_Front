export interface WriteOffFilterData {
  search: string;
  period: string;
}

export interface WriteOffFilterProps {
  onApply: (data: WriteOffFilterData) => void;
  onReset: () => void;
  initialData?: Partial<WriteOffFilterData>;
}
