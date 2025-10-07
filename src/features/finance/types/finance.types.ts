export interface FinanceItem {
  id: string;
  date: string; // Дата
  accountNumber: string; // № рахунку
  counterparty: string; // Контрагент
  amount: number; // Сума рахунку
  type: "б/г" | "готівка"; // Тип
  status: "Планування" | "Пауза" | "У процесі" | "На розгляді" | "Запуск"; // Статус
  files: string; // Файли
  comment: string; // Коментар
}

export interface FinanceColumn {
  key: keyof FinanceItem;
  label: string;
  visible: boolean;
  sortable: boolean;
  width: string;
  type: "text" | "number" | "date" | "select";
  options?: { value: string; label: string }[];
  render?: (value: any) => React.ReactNode;
}
