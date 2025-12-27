import { api } from "@/shared/api";

import { MaterialItem } from "./material-items.service";

export type PurchaseItemStatus =
  | "ORDERED"
  | "PARTIALLY_RECEIVED"
  | "READY"
  | "RECEIVED"
  | "CANCELLED";

export interface PriceCategories {
  over100: number;
  from50to100: number;
  from10to50: number;
  from10: number;
}

export interface PurchaseItem {
  id: string;
  purchaseId: string;
  materialItemId: string;
  materialItem: MaterialItem;
  date: string;
  width: number;
  length: number;
  dimensions?: string;
  volume?: number;
  weight?: number;
  priceCategories: PriceCategories;
  purchasePrice: number;
  salePrice: number;
  status: PurchaseItemStatus;
  orderedQuantity: number;
  receivedQuantity: number;
  comment?: string;
  warningQty?: number;
  createdAt: string;
  updatedAt: string;
}

export interface PurchaseItemsQuery {
  page?: number;
  limit?: number;
  search?: string;
}

export interface PurchaseItemsResponse {
  data: PurchaseItem[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CreatePurchaseItemDto {
  materialItemId: string;
  date: string;
  width: number;
  length: number;
  dimensions?: string;
  volume?: number;
  weight?: number;
  priceCategories: PriceCategories;
  purchasePrice: number;
  salePrice: number;
  status?: PurchaseItemStatus;
  orderedQuantity: number;
  receivedQuantity?: number;
  comment?: string;
  warningQty?: number;
}

export interface UpdatePurchaseItemDto {
  materialItemId?: string;
  date?: string;
  width?: number;
  length?: number;
  dimensions?: string;
  volume?: number;
  weight?: number;
  priceCategories?: PriceCategories;
  purchasePrice?: number;
  salePrice?: number;
  status?: PurchaseItemStatus;
  orderedQuantity?: number;
  receivedQuantity?: number;
  comment?: string;
  warningQty?: number;
}

class PurchaseItemsService {
  public getAll(purchaseId: string, params: PurchaseItemsQuery = { page: 1, limit: 20 }) {
    return api.get<PurchaseItemsResponse>(`purchases/${purchaseId}/items`, {
      params: {
        page: params.page ?? 1,
        limit: params.limit ?? 20,
        ...(params.search && { search: params.search }),
      },
    });
  }

  public getById(purchaseId: string, id: string) {
    return api.get<PurchaseItem>(`purchases/${purchaseId}/items/${id}`);
  }

  public create(purchaseId: string, data: CreatePurchaseItemDto) {
    return api.post<PurchaseItem>(`purchases/${purchaseId}/items`, {
      ...data,
      status: data.status || "ORDERED",
      receivedQuantity: data.receivedQuantity || 0,
    });
  }

  public update(purchaseId: string, id: string, data: UpdatePurchaseItemDto) {
    return api.put<PurchaseItem>(`purchases/${purchaseId}/items/${id}`, data);
  }

  public delete(purchaseId: string, id: string) {
    return api.delete<void>(`purchases/${purchaseId}/items/${id}`);
  }

  public updateStatus(purchaseId: string, id: string, status: PurchaseItemStatus) {
    return api.patch<PurchaseItem>(`purchases/${purchaseId}/items/${id}/status`, { status });
  }

  public receive(purchaseId: string, id: string, receivedQuantity: number) {
    return api.patch<PurchaseItem>(`purchases/${purchaseId}/items/${id}/receive`, { receivedQuantity });
  }
}

export const purchaseItemsService = new PurchaseItemsService();
