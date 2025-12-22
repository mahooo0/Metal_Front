import { api } from "@/shared/api";

export interface MaterialCategory {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface MaterialCategoriesQuery {
  search?: string;
  sortBy?: "name" | "createdAt";
  sortDirection?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export interface MaterialCategoriesResponse {
  data: MaterialCategory[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CreateMaterialCategoryDto {
  name: string;
}

export interface UpdateMaterialCategoryDto {
  name?: string;
}

class MaterialCategoriesService {
  public getCategories(params: MaterialCategoriesQuery = { page: 1, limit: 20 }) {
    return api.get<MaterialCategoriesResponse>("material-categories", {
      params: {
        page: params.page ?? 1,
        limit: params.limit ?? 20,
        ...(params.search && { search: params.search }),
        ...(params.sortBy && { sortBy: params.sortBy }),
        ...(params.sortDirection && { sortDirection: params.sortDirection }),
      },
    });
  }

  public getById(id: string) {
    return api.get<MaterialCategory>(`material-categories/${id}`);
  }

  public create(data: CreateMaterialCategoryDto) {
    return api.post<MaterialCategory>("material-categories", data);
  }

  public update(id: string, data: UpdateMaterialCategoryDto) {
    return api.put<MaterialCategory>(`material-categories/${id}`, data);
  }

  public delete(id: string) {
    return api.delete<void>(`material-categories/${id}`);
  }
}

export const materialCategoriesService = new MaterialCategoriesService();
