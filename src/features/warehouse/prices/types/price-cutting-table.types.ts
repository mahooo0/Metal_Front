export interface PriceCuttingTableItem {
  id: string;
  material: string; // Матеріал
  thickness: string; // Товщина, мм
  from100ml: string; // Від 100 мл
  from50_100ml: string; // Від 50-100 мл
  from10_50ml: string; // Від 10-50 мл
  to10ml: string; // До 10 мл
  supply: string; // Подача, різка
  cuttingTime: string; // Час порізки
}

export interface PriceCuttingTableColumn {
  key: keyof PriceCuttingTableItem;
  label: string;
  visible: boolean;
  sortable: boolean;
  width: string;
  type: "text";
}
