import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { suppliersService } from "@/service/suppliers.service";

export function useDeleteSupplier() {
  const queryClient = useQueryClient();

  const { mutate: deleteSupplier, isPending } = useMutation({
    mutationFn: (id: string) => suppliersService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      toast.success("Постачальника успішно видалено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося видалити постачальника");
    },
  });

  return {
    deleteSupplier,
    isPending,
  };
}
