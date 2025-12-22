import { api } from "@/shared/api";

export interface MetalBrand {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface MaterialCategory {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface MaterialItem {
  id: string;
  name: string;
  thickness: number;
  typeId: string;
  type: MetalBrand;
  sheetType: string;
  cuttingSupply?: number;
  cuttingTime?: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MaterialItemsQuery {
  search?: string;
  typeId?: string;
  thickness?: number;
  sheetType?: string;
  sortBy?: "name" | "thickness" | "createdAt";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export interface MaterialItemsResponse {
  data: MaterialItem[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CreateMaterialItemDto {
  name: string;
  thickness: number;
  typeId: string;
  sheetType: string;
  cuttingSupply?: number;
  cuttingTime?: number;
  description?: string;
}

export interface UpdateMaterialItemDto {
  name?: string;
  thickness?: number;
  typeId?: string;
  sheetType?: string;
  cuttingSupply?: number;
  cuttingTime?: number;
  description?: string;
}

class MaterialItemsService {
  public getItems(params: MaterialItemsQuery = { page: 1, limit: 20 }) {
    return api.get<MaterialItemsResponse>("material-items", {
      params: {
        page: params.page ?? 1,
        limit: params.limit ?? 20,
        ...(params.search && { search: params.search }),
        ...(params.typeId && { typeId: params.typeId }),
        ...(params.thickness && { thickness: params.thickness }),
        ...(params.sheetType && { sheetType: params.sheetType }),
        ...(params.sortBy && { sortBy: params.sortBy }),
        ...(params.sortOrder && { sortOrder: params.sortOrder }),
      },
    });
  }

  public getById(id: string) {
    return api.get<MaterialItem>(`material-items/${id}`);
  }

  public create(data: CreateMaterialItemDto) {
    return api.post<MaterialItem>("material-items", data);
  }

  public update(id: string, data: UpdateMaterialItemDto) {
    return api.put<MaterialItem>(`material-items/${id}`, data);
  }

  public delete(id: string) {
    return api.delete<void>(`material-items/${id}`);
  }
}

export const materialItemsService = new MaterialItemsService();
