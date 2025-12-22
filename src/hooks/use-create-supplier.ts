import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  suppliersService,
  CreateSupplierDto,
} from "@/service/suppliers.service";

export function useCreateSupplier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSupplierDto) => suppliersService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      toast.success("Постачальника успішно створено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося створити постачальника");
    },
  });
}
