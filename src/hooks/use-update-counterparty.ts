import {
  UpdateCounterpartyDto,
  counterpartiesService,
} from "@/service/counterparties.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateCounterparty() {
  const queryClient = useQueryClient();

  const { mutate: updateCounterparty, isPending } = useMutation({
    mutationKey: ["update-counterparty"],
    mutationFn: (data: { id: string } & UpdateCounterpartyDto) => {
      const { id, ...updateData } = data;
      return counterpartiesService.update(id, updateData);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["counterparties"] });
      queryClient.invalidateQueries({
        queryKey: ["counterparty", variables.id],
      });
      toast.success("Контрагента успішно оновлено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося оновити контрагента");
    },
  });

  return { updateCounterparty, isPending };
}
