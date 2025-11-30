import { counterpartiesService } from "@/service/counterparties.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteCounterparty() {
  const queryClient = useQueryClient();

  const { mutate: deleteCounterparty, isPending } = useMutation({
    mutationKey: ["delete-counterparty"],
    mutationFn: (id: string) => {
      return counterpartiesService.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["counterparties"] });
      toast.success("Контрагента успішно видалено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося видалити контрагента");
    },
  });

  return { deleteCounterparty, isPending };
}
