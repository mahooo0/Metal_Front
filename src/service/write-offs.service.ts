import { api } from "@/shared/api";

import { Material } from "./materials.service";

export interface WriteOff {
  id: string;
  materialId: string;
  material: Material;
  quantity: number;
  reason: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WriteOffsQuery {
  materialId?: string;
  reason?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: "createdAt" | "quantity";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export interface WriteOffsResponse {
  data: WriteOff[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CreateWriteOffDto {
  materialId: string;
  quantity: number;
  reason: string;
  notes?: string;
}

export interface UpdateWriteOffDto {
  quantity?: number;
  reason?: string;
  notes?: string;
}

class WriteOffsService {
  public getAll(params: WriteOffsQuery = { page: 1, limit: 20 }) {
    return api.get<WriteOffsResponse>("write-offs", {
      params: {
        page: params.page ?? 1,
        limit: params.limit ?? 20,
        ...(params.materialId && { materialId: params.materialId }),
        ...(params.reason && { reason: params.reason }),
        ...(params.startDate && { startDate: params.startDate }),
        ...(params.endDate && { endDate: params.endDate }),
        ...(params.sortBy && { sortBy: params.sortBy }),
        ...(params.sortOrder && { sortOrder: params.sortOrder }),
      },
    });
  }

  public getById(id: string) {
    return api.get<WriteOff>(`write-offs/${id}`);
  }

  public create(data: CreateWriteOffDto) {
    return api.post<WriteOff>("write-offs", data);
  }

  public update(id: string, data: UpdateWriteOffDto) {
    return api.put<WriteOff>(`write-offs/${id}`, data);
  }

  public delete(id: string) {
    return api.delete<void>(`write-offs/${id}`);
  }
}

export const writeOffsService = new WriteOffsService();
