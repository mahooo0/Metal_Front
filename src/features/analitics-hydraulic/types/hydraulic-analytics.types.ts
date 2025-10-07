import { DataTableColumn } from "@/shared/ui/data-table";

export interface HydraulicAnalyticsItem {
  id: string;
  createdDate: string; // Дата створення
  startProcessingDate: string; // Дата поч. обробки
  endProcessingDate: string; // Дата зав. обр.
  orderNumber: string; // Номер замовлення
  layoutName: string; // Найменування розкладки
  startExecutionTime: string; // Час початку вик.
  endExecutionTime: string; // Час зак.вик.
  plannedTimeMinutes: number; // Ативний пл. час, хв.
  actualCuttingTimeMinutes: number; // Факт час порізки, хв
  actualCuttingTimeHours: number; // Факт час порізки, ч.
  cutQuality: number; // Якість різу
  comment: string; // Коментар
  files: string; // Файли (PDF иконка)
}

export interface HydraulicAnalyticsColumn
  extends DataTableColumn<HydraulicAnalyticsItem> {
  key: keyof HydraulicAnalyticsItem;
  label: string;
  visible: boolean;
  sortable: boolean;
  width: string;
  type: "text" | "date" | "number";
  options?: { value: string; label: string }[];
}
