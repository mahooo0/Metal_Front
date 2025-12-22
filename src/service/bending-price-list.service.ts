import { api } from "@/shared/api";

import { MaterialItem } from "./material-items.service";

export interface BendingPriceListItem {
  id: string;
  materialItemId: string;
  materialItem: MaterialItem;
  price: number;
  minQuantity?: number;
  maxQuantity?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BendingPriceListQuery {
  materialItemId?: string;
  sortBy?: "price" | "createdAt";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export interface BendingPriceListResponse {
  data: BendingPriceListItem[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CreateBendingPriceDto {
  materialItemId: string;
  price: number;
  minQuantity?: number;
  maxQuantity?: number;
  notes?: string;
}

export interface UpdateBendingPriceDto {
  price?: number;
  minQuantity?: number;
  maxQuantity?: number;
  notes?: string;
}

class BendingPriceListService {
  public getAll(params: BendingPriceListQuery = { page: 1, limit: 20 }) {
    return api.get<BendingPriceListResponse>("price-lists/bending", {
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
    return api.get<BendingPriceListItem>(`price-lists/bending/${id}`);
  }

  public create(data: CreateBendingPriceDto) {
    return api.post<BendingPriceListItem>("price-lists/bending", data);
  }

  public update(id: string, data: UpdateBendingPriceDto) {
    return api.put<BendingPriceListItem>(`price-lists/bending/${id}`, data);
  }

  public delete(id: string) {
    return api.delete<void>(`price-lists/bending/${id}`);
  }
}

export const bendingPriceListService = new BendingPriceListService();
