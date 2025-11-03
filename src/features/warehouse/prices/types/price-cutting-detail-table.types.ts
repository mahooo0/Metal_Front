export interface PriceCuttingDetailTableItem {
  id: string;
  material: string; // Матеріал
  thickness: string; // Товщина, мм
  m: string; // M
  x: string; // X
}

export interface PriceCuttingDetailTableColumn {
  key: keyof PriceCuttingDetailTableItem;
  label: string;
  visible: boolean;
  sortable: boolean;
  width: string;
  type: "text";
}
