export interface LaserAnalyticsItem {
  id: string;
  createdDate: string; // Дата створення
  startProcessingDate: string; // Дата поч. обробки
  orderNumber: string; // Номер замовлення
  customer: string; // Замовник
  productName: string; // Найменування уп
  plannedTimeMinutes: number; // Активний пл. час, хв.
  actualTimeMinutes: number; // Активний факт. час хв.
  startExecutionTime: string; // Час початку вик.
  endExecutionTime: string; // Час зак.вик.
  comment: string; // Коментар
}

export interface LaserAnalyticsColumn {
  key: keyof LaserAnalyticsItem;
  label: string;
  visible: boolean;
  sortable: boolean;
  width: string;
  type: "text" | "date" | "number";
  options?: { value: string; label: string }[];
}
