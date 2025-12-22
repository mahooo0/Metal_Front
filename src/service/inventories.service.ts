import { api } from "@/shared/api";

export type InventoryStatus = "draft" | "in_progress" | "completed";

export interface Inventory {
  id: string;
  status: InventoryStatus;
  notes?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InventoriesQuery {
  status?: InventoryStatus;
  startDate?: string;
  endDate?: string;
  sortBy?: "createdAt" | "completedAt";
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
  status?: InventoryStatus;
  notes?: string;
}

export interface UpdateInventoryDto {
  status?: InventoryStatus;
  notes?: string;
}

class InventoriesService {
  public getAll(params: InventoriesQuery = { page: 1, limit: 20 }) {
    return api.get<InventoriesResponse>("inventories", {
      params: {
        page: params.page ?? 1,
        limit: params.limit ?? 20,
        ...(params.status && { status: params.status }),
        ...(params.startDate && { startDate: params.startDate }),
        ...(params.endDate && { endDate: params.endDate }),
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
    return api.put<Inventory>(`inventories/${id}`, data);
  }

  public delete(id: string) {
    return api.delete<void>(`inventories/${id}`);
  }
}

export const inventoriesService = new InventoriesService();
