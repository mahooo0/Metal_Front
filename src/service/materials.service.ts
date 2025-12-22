import { api } from "@/shared/api";

import { MaterialItem } from "./material-items.service";

export type MaterialStatus =
  | "IN_PROCESS"
  | "UNDER_REVIEW"
  | "PLANNING"
  | "CALCULATION"
  | "LAUNCH";

export interface PriceCategories {
  over100: number;
  from50to100: number;
  from10to50: number;
  from10: number;
}

export interface Supplier {
  id: string;
  name: string;
  legalAddress?: string;
  actualAddress?: string;
  bankDetails?: string;
  edrpou?: string;
  ipn?: string;
  taxId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Material {
  id: string;
  materialItemId: string;
  materialItem: MaterialItem;
  supplierId: string;
  supplier: Supplier;
  date: string;
  width: number;
  length: number;
  dimensions?: string | null;
  volume?: number | null;
  weight?: number | null;
  quantity: number;
  status: MaterialStatus;
  priceCategories: PriceCategories;
  comment?: string;
  warningQty?: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface MaterialsQuery {
  search?: string;
  materialItemId?: string;
  status?: MaterialStatus;
  minQuantity?: number;
  maxQuantity?: number;
  sortBy?: "quantity" | "createdAt" | "updatedAt";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export interface MaterialsResponse {
  data: Material[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CreateMaterialDto {
  materialItemId: string;
  supplierId: string;
  date: string;
  width: number;
  length: number;
  quantity: number;
  status: MaterialStatus;
  priceCategories: PriceCategories;
  comment?: string;
}

export interface UpdateMaterialDto {
  date?: string;
  width?: number;
  length?: number;
  quantity?: number;
  status?: MaterialStatus;
  priceCategories?: PriceCategories;
  comment?: string;
}

class MaterialsService {
  public getAll(params: MaterialsQuery = { page: 1, limit: 20 }) {
    return api.get<MaterialsResponse>("materials", {
      params: {
        page: params.page ?? 1,
        limit: params.limit ?? 20,
        ...(params.search && { search: params.search }),
        ...(params.materialItemId && { materialItemId: params.materialItemId }),
        ...(params.status && { status: params.status }),
        ...(params.minQuantity && { minQuantity: params.minQuantity }),
        ...(params.maxQuantity && { maxQuantity: params.maxQuantity }),
        ...(params.sortBy && { sortBy: params.sortBy }),
        ...(params.sortOrder && { sortOrder: params.sortOrder }),
      },
    });
  }

  public getById(id: string) {
    return api.get<Material>(`materials/${id}`);
  }

  public create(data: CreateMaterialDto) {
    return api.post<Material>("materials", data);
  }

  public update(id: string, data: UpdateMaterialDto) {
    return api.put<Material>(`materials/${id}`, data);
  }

  public delete(id: string) {
    return api.delete<void>(`materials/${id}`);
  }
}

export const materialsService = new MaterialsService();
