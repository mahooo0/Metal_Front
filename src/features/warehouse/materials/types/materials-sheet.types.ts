export interface MaterialsSheetData {
  id: string;
  created: string;
  name: string;
  thickness: number;
  type: string;
  size: string;
  volume: number;
  weight: number;
  status: string;
  quantity: number;
  description: string;
  priceFrom100: string;
  priceFrom50to100: string;
  priceFrom10to50: string;
  priceFrom10: string;
  feedCut: string;
  cutTime: string;
}

export interface MaterialsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  material: MaterialsSheetData | null;
  onSave?: (data: MaterialsSheetData) => void;
  onReject?: () => void;
}
