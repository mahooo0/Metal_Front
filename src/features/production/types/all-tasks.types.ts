// All tasks item types based on the table structure from the image
export interface AllTasksItem {
  id: string;
  creationDate: string; // Дата створення
  processingStartDate: string; // Дата поч. обробки
  orderNumber: string; // Номер замовлення
  customer: string; // Замовник
  customerOrderNumber: string; // Найменування уп
  activePlannedTime: string; // Активний пл. час. хв.
  activeActualTime: string; // Активний факт. час хв.
  startTime: string; // Час початку вик.
  endTime: string; // Час зак.вик.
  comment: string; // Коментар
  status: "new" | "in-progress" | "completed"; // Статус для табів
}

export interface AllTasksColumn {
  key: keyof AllTasksItem;
  label: string;
  visible: boolean;
  sortable?: boolean;
  width?: string;
  type?: "text" | "date" | "select" | "number";
  options?: { value: string; label: string }[];
  render?: (value: string | number, row: AllTasksItem) => React.ReactNode;
}
