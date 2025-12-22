import { api } from "@/shared/api";

import { MaterialItem } from "./material-items.service";

export interface CuttingPriceListItem {
  id: string;
  materialItemId: string;
  materialItem: MaterialItem;
  price: number;
  minLength?: number;
  maxLength?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CuttingPriceListQuery {
  materialItemId?: string;
  sortBy?: "price" | "createdAt";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export interface CuttingPriceListResponse {
  data: CuttingPriceListItem[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CreateCuttingPriceDto {
  materialItemId: string;
  price: number;
  minLength?: number;
  maxLength?: number;
  notes?: string;
}

export interface UpdateCuttingPriceDto {
  price?: number;
  minLength?: number;
  maxLength?: number;
  notes?: string;
}

class CuttingPriceListService {
  public getAll(params: CuttingPriceListQuery = { page: 1, limit: 20 }) {
    return api.get<CuttingPriceListResponse>("price-lists/cutting", {
      params: {
        page: params.page ?? 1,
        limit: params.limit ?? 20,
        ...(params.materialItemId && { materialItemId: params.materialItemId }),
        ...(params.sortBy && { sortBy: params.sortBy }),
        ...(params.sortOrder && { sortOrder: params.sortOrder }),
      },
    });
  }

  public getById(id: string) {
    return api.get<CuttingPriceListItem>(`price-lists/cutting/${id}`);
  }

  public create(data: CreateCuttingPriceDto) {
    return api.post<CuttingPriceListItem>("price-lists/cutting", data);
  }

  public update(id: string, data: UpdateCuttingPriceDto) {
    return api.put<CuttingPriceListItem>(`price-lists/cutting/${id}`, data);
  }

  public delete(id: string) {
    return api.delete<void>(`price-lists/cutting/${id}`);
  }
}

export const cuttingPriceListService = new CuttingPriceListService();
