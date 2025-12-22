import { api } from "@/shared/api";

import { Supplier } from "./suppliers.service";
import { MaterialItem } from "./material-items.service";

export type PurchaseStatus =
  | "IN_PROCESS"
  | "UNDER_REVIEW"
  | "PLANNING"
  | "CALCULATION"
  | "LAUNCH"
  | "RECEIVED";

export interface PurchaseItem {
  id: string;
  purchaseId: string;
  materialItemId: string;
  materialItem?: MaterialItem;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface Purchase {
  id: string;
  purchaseId: string;
  date: string;
  supplierId: string;
  supplier: Supplier;
  status: PurchaseStatus;
  totalAmount: number;
  comment?: string;
  items: PurchaseItem[];
  createdAt: string;
  updatedAt: string;
}

export interface PurchasesQuery {
  search?: string;
  supplierId?: string;
  materialItemId?: string;
  status?: PurchaseStatus;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: "date" | "totalAmount" | "status" | "createdAt";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export interface PurchasesResponse {
  data: Purchase[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CreatePurchaseDto {
  date: string;
  purchaseId: string;
  supplierId: string;
  totalAmount: number;
  status: PurchaseStatus;
  comment?: string;
}

export interface UpdatePurchaseDto {
  date?: string;
  purchaseId?: string;
  totalAmount?: number;
  status?: PurchaseStatus;
  comment?: string;
}

class PurchasesService {
  public getAll(params: PurchasesQuery = { page: 1, limit: 20 }) {
    return api.get<PurchasesResponse>("purchases", {
      params: {
        page: params.page ?? 1,
        limit: params.limit ?? 20,
        ...(params.search && { search: params.search }),
        ...(params.supplierId && { supplierId: params.supplierId }),
        ...(params.materialItemId && { materialItemId: params.materialItemId }),
        ...(params.status && { status: params.status }),
        ...(params.dateFrom && { dateFrom: params.dateFrom }),
        ...(params.dateTo && { dateTo: params.dateTo }),
        ...(params.sortBy && { sortBy: params.sortBy }),
        ...(params.sortOrder && { sortOrder: params.sortOrder }),
      },
    });
  }

  public getById(id: string) {
    return api.get<Purchase>(`purchases/${id}`);
  }

  public create(data: CreatePurchaseDto) {
    return api.post<Purchase>("purchases", data);
  }

  public update(id: string, data: UpdatePurchaseDto) {
    return api.put<Purchase>(`purchases/${id}`, data);
  }

  public updateStatus(id: string, status: PurchaseStatus) {
    return api.patch<Purchase>(`purchases/${id}/status`, { status });
  }

  public delete(id: string) {
    return api.delete<void>(`purchases/${id}`);
  }

  public submit(id: string) {
    return api.post<Purchase>(`purchases/${id}/submit`);
  }
}

export const purchasesService = new PurchasesService();
