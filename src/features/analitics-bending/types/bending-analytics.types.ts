import { DataTableColumn } from "@/shared/ui/data-table";

export interface BendingAnalyticsItem {
  id: string;
  createdDate: string; // Дата створення
  startProcessingDate: string; // Дата поч. обробки
  orderNumber: string; // Номер замовлення
  drawing: string; // Креслення (PDF иконка + текст)
  metalTypeThickness: number; // Вид металу, товщина
  plannedBendsCount: number; // Кількість згибів, шт
  actualBendsCount: number; // Кількість згибів факт
  activeActualTimeMinutes: number; // Активний факт. час, хв.
  startExecutionTime: string; // Час початку вик.
  endExecutionTime: string; // Час зак. вик.
  comment: string; // Коментар
  date: string; // Дата
}

export interface BendingAnalyticsColumn
  extends DataTableColumn<BendingAnalyticsItem> {
  key: keyof BendingAnalyticsItem;
  label: string;
  visible: boolean;
  sortable: boolean;
  width: string;
  type: "text" | "date" | "number";
  options?: { value: string; label: string }[];
}
