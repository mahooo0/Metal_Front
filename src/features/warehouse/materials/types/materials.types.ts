export interface MaterialItem {
  id: string;
  date: string;
  materialName: string;
  thickness: number;
  type: string;
  width: number;
  length: number;
  volume: number;
  weight: number;
  sheetType: string;
  status: MaterialStatus;
  quantity: number;
  comment: string;
}

export type MaterialStatus =
  | "У процесі"
  | "На розгляді"
  | "Планування"
  | "Прорахунок"
  | "Запуск";

export interface MaterialColumn {
  key: keyof MaterialItem;
  label: string;
  visible: boolean;
  sortable: boolean;
  width?: string;
  type: "text" | "number" | "date";
  render?: (value: any, item: MaterialItem) => React.ReactNode;
}
