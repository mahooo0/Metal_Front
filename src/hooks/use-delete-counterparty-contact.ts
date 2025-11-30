import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { counterpartiesService } from "@/service/counterparties.service";

export function useDeleteCounterpartyContact(counterpartyId: string) {
  const queryClient = useQueryClient();

  const { mutate: deleteContact, isPending } = useMutation({
    mutationKey: ["delete-counterparty-contact", counterpartyId],
    mutationFn: (contactId: string) => {
      return counterpartiesService.deleteContact(counterpartyId, contactId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["counterparty", counterpartyId],
      });
      toast.success("Контакт успішно видалено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося видалити контакт");
    },
  });

  return { deleteContact, isPending };
}

