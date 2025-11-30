import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { counterpartiesService } from "@/service/counterparties.service";

export function useCreateCounterpartyContact(counterpartyId: string) {
  const queryClient = useQueryClient();

  const { mutate: createContact, isPending } = useMutation({
    mutationKey: ["create-counterparty-contact", counterpartyId],
    mutationFn: (data: { phone: string; email: string }) => {
      return counterpartiesService.createContact(counterpartyId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["counterparty", counterpartyId],
      });
      toast.success("Контакт успішно додано");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося додати контакт");
    },
  });

  return { createContact, isPending };
}

