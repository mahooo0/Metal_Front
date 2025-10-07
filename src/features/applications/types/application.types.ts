// Types for tasks table
export interface ApplicationItem {
  id: string;
  createdDate: string;
  startDate: string;
  entity: string;
  taskType: string;
  creator: string;
  responsible: string;
  comment: string;
  status: "current" | "completed";
}

export interface ApplicationColumn {
  key: keyof ApplicationItem;
  label: string;
  visible: boolean;
  sortable?: boolean;
  width?: string;
  type?: "text" | "date" | "select" | "number";
  options?: { value: string; label: string }[];
  render?: (value: string | number) => React.ReactNode;
}
