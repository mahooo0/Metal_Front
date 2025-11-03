export interface AddMaterialData {
  name: string;
  thickness: string;
  type: string;
  width: string;
  length: string;
  volume: string;
  weight: string;
  sheetType: string;
  quantity: string;
  minimumQuantity: string;
  comment: string;
}

export interface AddMaterialDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: AddMaterialData) => void;
}
