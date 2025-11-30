import { counterpartiesService } from "@/service/counterparties.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateCounterpartyContact(counterpartyId: string) {
  const queryClient = useQueryClient();

  const { mutate: updateContact, isPending } = useMutation({
    mutationKey: ["update-counterparty-contact", counterpartyId],
    mutationFn: ({
      contactId,
      data,
    }: {
      contactId: string;
      data: { phone: string; email: string };
    }) => {
      return counterpartiesService.updateContact(
        counterpartyId,
        contactId,
        data
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["counterparty", counterpartyId],
      });
      toast.success("Контакт успішно оновлено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося оновити контакт");
    },
  });

  return { updateContact, isPending };
}
