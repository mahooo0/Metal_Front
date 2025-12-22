import { api } from "@/shared/api";

export interface MaterialCategory {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface MetalBrand {
  id: string;
  name: string;
  categoryId: string;
  category?: MaterialCategory;
  createdAt: string;
  updatedAt: string;
}

export interface MetalBrandsResponse {
  data: MetalBrand[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CreateMetalBrandDto {
  name: string;
  categoryId: string;
}

export interface UpdateMetalBrandDto {
  name?: string;
  categoryId?: string;
}

class MetalBrandsService {
  public getMetalBrands() {
    return api.get<MetalBrandsResponse>("metal-brands");
  }

  public getById(id: string) {
    return api.get<MetalBrand>(`metal-brands/${id}`);
  }

  public create(data: CreateMetalBrandDto) {
    return api.post<MetalBrand>("metal-brands", data);
  }

  public update(id: string, data: UpdateMetalBrandDto) {
    return api.put<MetalBrand>(`metal-brands/${id}`, data);
  }

  public delete(id: string) {
    return api.delete<void>(`metal-brands/${id}`);
  }
}

export const metalBrandsService = new MetalBrandsService();

