import { api } from "@/shared/api";

export interface SupplierContact {
  id?: string;
  name: string;
  phone: string;
  email: string;
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
  contacts?: SupplierContact[];
  createdAt: string;
  updatedAt: string;
}

export interface SuppliersQuery {
  search?: string;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
  page?: number;
  limit?: number;
}

export interface SuppliersResponse {
  data: Supplier[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CreateSupplierContactDto {
  name: string;
  phone: string;
  email: string;
}

export interface CreateSupplierDto {
  name: string;
  legalAddress?: string;
  actualAddress?: string;
  bankDetails?: string;
  edrpou?: string;
  ipn?: string;
  taxId?: string;
  contacts?: CreateSupplierContactDto[];
}

export interface UpdateSupplierDto {
  name?: string;
  legalAddress?: string;
  actualAddress?: string;
  bankDetails?: string;
  edrpou?: string;
  ipn?: string;
  taxId?: string;
  contacts?: CreateSupplierContactDto[];
}

class SuppliersService {
  public getAll(params: SuppliersQuery = { page: 1, limit: 20 }) {
    return api.get<SuppliersResponse>("suppliers", {
      params: {
        page: params.page ?? 1,
        limit: params.limit ?? 20,
        ...(params.search && { search: params.search }),
        ...(params.sortBy && { sortBy: params.sortBy }),
        ...(params.sortOrder && { sortOrder: params.sortOrder }),
      },
    });
  }

  public getById(id: string) {
    return api.get<Supplier>(`suppliers/${id}`);
  }

  public create(data: CreateSupplierDto) {
    return api.post<Supplier>("suppliers", data);
  }

  public update(id: string, data: UpdateSupplierDto) {
    return api.put<Supplier>(`suppliers/${id}`, data);
  }

  public delete(id: string) {
    return api.delete<void>(`suppliers/${id}`);
  }
}

export const suppliersService = new SuppliersService();
