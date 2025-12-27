import { api } from "@/shared/api";

import { Material } from "./materials.service";

export type InventoryStatus = "IN_PROGRESS" | "PENDING" | "APPROVED" | "REJECTED";

export interface InventoryItem {
  id: string;
  systemQuantity: number;
  actualQuantity: number | null;
  difference: number | null;
  comment?: string;
  inventoryId: string;
  materialId: string;
  material: Material;
  createdAt: string;
  updatedAt: string;
}

export interface Inventory {
  id: string;
  inventoryNumber: string;
  date: string;
  status: InventoryStatus;
  comment?: string;
  approvedAt?: string;
  rejectedAt?: string;
  rejectionReason?: string;
  items: InventoryItem[];
  _count?: { items: number };
  createdAt: string;
  updatedAt: string;
}

export interface InventoriesQuery {
  search?: string;
  status?: InventoryStatus;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: "date" | "status" | "createdAt";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export interface InventoriesResponse {
  data: Inventory[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CreateInventoryDto {
  inventoryNumber: string;
  date: string;
  comment?: string;
}

export interface UpdateInventoryDto {
  comment?: string;
}

export interface UpdateInventoryItemDto {
  actualQuantity: number;
  comment?: string;
}

export interface RejectInventoryDto {
  reason: string;
}

class InventoriesService {
  public getAll(params: InventoriesQuery = { page: 1, limit: 20 }) {
    return api.get<InventoriesResponse>("inventories", {
      params: {
        page: params.page ?? 1,
        limit: params.limit ?? 20,
        ...(params.search && { search: params.search }),
        ...(params.status && { status: params.status }),
        ...(params.dateFrom && { dateFrom: params.dateFrom }),
        ...(params.dateTo && { dateTo: params.dateTo }),
        ...(params.sortBy && { sortBy: params.sortBy }),
        ...(params.sortOrder && { sortOrder: params.sortOrder }),
      },
    });
  }

  public getById(id: string) {
    return api.get<Inventory>(`inventories/${id}`);
  }

  public create(data: CreateInventoryDto) {
    return api.post<Inventory>("inventories", data);
  }

  public update(id: string, data: UpdateInventoryDto) {
    return api.patch<Inventory>(`inventories/${id}`, data);
  }

  public updateItem(inventoryId: string, itemId: string, data: UpdateInventoryItemDto) {
    return api.patch<Inventory>(`inventories/${inventoryId}/items/${itemId}`, data);
  }

  public submit(id: string) {
    return api.post<Inventory>(`inventories/${id}/submit`);
  }

  public approve(id: string) {
    return api.post<Inventory>(`inventories/${id}/approve`);
  }

  public reject(id: string, data: RejectInventoryDto) {
    return api.post<Inventory>(`inventories/${id}/reject`, data);
  }

  public delete(id: string) {
    return api.delete<void>(`inventories/${id}`);
  }
}

export const inventoriesService = new InventoriesService();
