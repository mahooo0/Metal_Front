import { counterpartiesService } from "@/service/counterparties.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateCounterparty() {
  const queryClient = useQueryClient();

  const { mutate: createCounterparty, isPending } = useMutation({
    mutationKey: ["create-counterparty"],
    mutationFn: (data: { name: string; comment?: string }) => {
      return counterpartiesService.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["counterparties"] });
      toast.success("Контрагента успішно створено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося створити контрагента");
    },
  });

  return { createCounterparty, isPending };
}
