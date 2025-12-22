import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  metalBrandsService,
  CreateMetalBrandDto,
  UpdateMetalBrandDto,
  MetalBrand,
} from "@/service/metal-brands.service";

export function useMetalBrands() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["metal-brands"],
    queryFn: () => metalBrandsService.getMetalBrands(),
  });

  return {
    metalBrands: data?.data || [],
    isLoading,
    error,
  };
}

export function useCreateMetalBrand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMetalBrandDto) =>
      metalBrandsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["metal-brands"] });
      toast.success("Марку металу успішно створено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося створити марку металу");
    },
  });
}

export function useUpdateMetalBrand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateMetalBrandDto }) =>
      metalBrandsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["metal-brands"] });
      toast.success("Марку металу успішно оновлено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося оновити марку металу");
    },
  });
}

export function useDeleteMetalBrand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => metalBrandsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["metal-brands"] });
      toast.success("Марку металу успішно видалено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося видалити марку металу");
    },
  });
}

