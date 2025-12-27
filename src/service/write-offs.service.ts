import { api } from "@/shared/api";

import { Material } from "./materials.service";

export type WriteOffStatus = "DRAFT" | "PENDING" | "COMPLETED";

export interface WriteOffItem {
  id: string;
  quantity: number;
  weight?: number;
  amount: number;
  pricePerUnit: number;
  comment?: string;
  materialId: string;
  material: Material;
  createdAt: string;
  updatedAt: string;
}

export interface WriteOff {
  id: string;
  writeOffNumber: string;
  date: string;
  status: WriteOffStatus;
  comment?: string;
  totalQuantity: number;
  totalAmount: number;
  items: WriteOffItem[];
  completedAt?: string;
  rejectedAt?: string;
  rejectionReason?: string;
  _count?: { items: number };
  createdAt: string;
  updatedAt: string;
}

export interface WriteOffsQuery {
  search?: string;
  status?: WriteOffStatus;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: "date" | "status" | "totalAmount" | "createdAt";
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
  writeOffNumber: string;
  date: string;
  comment?: string;
}

export interface UpdateWriteOffDto {
  writeOffNumber?: string;
  date?: string;
  comment?: string;
}

export interface AddWriteOffItemDto {
  materialId: string;
  quantity: number;
  weight?: number;
  comment?: string;
}

export interface UpdateWriteOffItemDto {
  quantity?: number;
  weight?: number;
  comment?: string;
}

class WriteOffsService {
  public getAll(params: WriteOffsQuery = { page: 1, limit: 20 }) {
    return api.get<WriteOffsResponse>("write-offs", {
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
    return api.get<WriteOff>(`write-offs/${id}`);
  }

  public create(data: CreateWriteOffDto) {
    return api.post<WriteOff>("write-offs", data);
  }

  public update(id: string, data: UpdateWriteOffDto) {
    return api.patch<WriteOff>(`write-offs/${id}`, data);
  }

  public delete(id: string) {
    return api.delete<void>(`write-offs/${id}`);
  }

  public submit(id: string) {
    return api.post<WriteOff>(`write-offs/${id}/submit`);
  }

  public approve(id: string) {
    return api.post<WriteOff>(`write-offs/${id}/approve`);
  }

  public reject(id: string, reason: string) {
    return api.post<WriteOff>(`write-offs/${id}/reject`, { reason });
  }

  // Item methods
  public addItem(writeOffId: string, data: AddWriteOffItemDto) {
    return api.post<WriteOffItem>(`write-offs/${writeOffId}/items`, data);
  }

  public updateItem(
    writeOffId: string,
    itemId: string,
    data: UpdateWriteOffItemDto
  ) {
    return api.patch<WriteOffItem>(
      `write-offs/${writeOffId}/items/${itemId}`,
      data
    );
  }

  public removeItem(writeOffId: string, itemId: string) {
    return api.delete<void>(`write-offs/${writeOffId}/items/${itemId}`);
  }
}

export const writeOffsService = new WriteOffsService();
