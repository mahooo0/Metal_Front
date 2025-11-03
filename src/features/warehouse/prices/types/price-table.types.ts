export interface PriceTableItem {
  id: string;
  thickness: string; // Товщина, довжина
  range0_1000: string; // 0-1000
  range1001_2000: string; // 1001-2000
  range2001_3000: string; // 2001-3000
}

export interface PriceTableColumn {
  key: keyof PriceTableItem;
  label: string;
  visible: boolean;
  sortable: boolean;
  width: string;
  type: "text";
}
