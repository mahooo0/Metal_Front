import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  suppliersService,
  UpdateSupplierDto,
} from "@/service/suppliers.service";

export function useUpdateSupplier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSupplierDto }) =>
      suppliersService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      toast.success("Постачальника успішно оновлено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося оновити постачальника");
    },
  });
}
