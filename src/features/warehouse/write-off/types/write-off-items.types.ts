import { Material } from "@/service/materials.service";
import { WriteOffItem as WriteOffItemFromService } from "@/service/write-offs.service";

// Row data for the table - represents a material that can be written off
export interface WriteOffItemTableRow {
  materialId: string;
  material: Material;
  stockQuantity: number; // Available in warehouse
  writeOffQuantity: number; // Quantity to write off (editable)
  comment: string; // Comment (editable)
  pricePerUnit: number; // Price from priceCategories
  amount: number; // Calculated: pricePerUnit * writeOffQuantity
  existingItemId?: string; // If already added to write-off
}

export interface WriteOffItemsTableProps {
  materials: Material[];
  writeOffItems: WriteOffItemFromService[];
  localItems: Map<string, { quantity: number; comment: string }>;
  onItemChange: (
    materialId: string,
    data: { quantity: number; comment: string }
  ) => void;
  isLoading?: boolean;
  isDraft?: boolean;
}

export interface WriteOffItemColumn {
  key: string;
  label: string;
  visible: boolean;
  sortable: boolean;
  width?: string;
  type: "text" | "number" | "date" | "editable";
}

