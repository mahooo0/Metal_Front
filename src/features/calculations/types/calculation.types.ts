export interface CalculationItem {
  id: string;
  creationDate: string;
  calculationNumber: string;
  laserCutting: number;
  hydroCutting: number;
  bending: number;
  metal: number;
  metalAvailability: "Так" | "Ні";
  additionalWorks: number;
  designerServices: number;
  markup: number;
  amountWithVAT: number;
  invoiceAmountWithVAT: number;
}

export interface CalculationColumn {
  key: keyof CalculationItem;
  label: string;
  visible: boolean;
  sortable?: boolean;
  width?: string;
  type?: "text" | "date" | "select" | "number";
  options?: { value: string; label: string }[];
}
