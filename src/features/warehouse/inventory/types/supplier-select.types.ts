export interface SupplierSelectData {
  supplier: string;
}

export interface SupplierSelectProps {
  onSave?: (data: SupplierSelectData) => void;
  onCreatePurchaseRequest?: () => void;
  initialData?: Partial<SupplierSelectData>;
}
