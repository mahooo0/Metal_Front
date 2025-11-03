export interface PurchaseFilterData {
  search: string;
  period: string;
  product: string;
  status: string;
  supplier: string;
}

export interface PurchaseFilterProps {
  onApply: (data: PurchaseFilterData) => void;
  onReset: () => void;
  initialData?: Partial<PurchaseFilterData>;
}
