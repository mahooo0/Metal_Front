import { TaskStatus } from "./task-api.types";

// Types for tasks table
export interface TaskItem {
  id: string;
  createdDate: string;
  startDate: string;
  entity: string;
  taskType: string;
  creator: string;
  responsible: string;
  comment: string;
  status: TaskStatus;
  statusDisplay: "current" | "completed"; // For tab filtering
}

export interface TaskColumn {
  key: keyof TaskItem;
  label: string;
  visible: boolean;
  sortable?: boolean;
  width?: string;
  type?: "text" | "date" | "select" | "number";
  options?: { value: string; label: string }[];
  render?: (value: string | number) => React.ReactNode;
}
