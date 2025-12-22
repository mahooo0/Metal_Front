import { TaskStatus } from "../types/task-api.types";

export interface TaskStatusConfig {
  label: string;
  bgColor: string;
  textColor: string;
}

export const TASK_STATUS_CONFIG: Record<TaskStatus, TaskStatusConfig> = {
  PLANNING: {
    label: "Планування",
    bgColor: "bg-purple-100",
    textColor: "text-purple-800",
  },
  BACKLOG: {
    label: "Беклог",
    bgColor: "bg-gray-100",
    textColor: "text-gray-800",
  },
  TODO: {
    label: "Зробити",
    bgColor: "bg-blue-100",
    textColor: "text-blue-800",
  },
  IN_PROGRESS: {
    label: "В процесі",
    bgColor: "bg-green-100",
    textColor: "text-green-800",
  },
  CALCULATION: {
    label: "Прорахунок",
    bgColor: "bg-cyan-100",
    textColor: "text-cyan-800",
  },
  DONE: {
    label: "Виконано",
    bgColor: "bg-emerald-100",
    textColor: "text-emerald-800",
  },
  CANCELED: {
    label: "Скасовано",
    bgColor: "bg-red-100",
    textColor: "text-red-800",
  },
};

export function getTaskStatusConfig(status: TaskStatus): TaskStatusConfig {
  return TASK_STATUS_CONFIG[status] || TASK_STATUS_CONFIG.PLANNING;
}
