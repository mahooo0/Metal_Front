// Types for plan register table
export interface PlanRegisterItem {
  id: string;
  registrationDate: string;
  planNumber: string;
  orderNumber: string;
  customer: string;
  metalGrade: string;
  metalThickness: number;
  files: string | number;
  actions?: string;
}

export interface PlanRegisterColumn {
  key: keyof PlanRegisterItem;
  label: string;
  visible: boolean;
  sortable?: boolean;
  width?: string;
  type?: "text" | "date" | "select" | "number";
  options?: { value: string; label: string }[];
  render?: (value: string | number) => React.ReactNode;
}
