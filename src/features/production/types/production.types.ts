// Production item types based on the table structure from the image
export interface ProductionItem {
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
}

export interface ProductionColumn {
  key: keyof ProductionItem;
  label: string;
  visible: boolean;
  sortable?: boolean;
  width?: string;
  type?: "text" | "date" | "select" | "number";
  options?: { value: string; label: string }[];
  render?: (value: string | number, row: ProductionItem) => React.ReactNode;
}

export interface ProductionTableProps {
  data?: ProductionItem[];
  onAddService?: () => void;
  onInvoiceApplication?: () => void;
}
