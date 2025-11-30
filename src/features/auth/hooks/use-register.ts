import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { RegisterSchemaType } from "@/features/auth/schemas";
import { authService } from "@/features/auth/services";

import { toastMessageHandler } from "@/shared/utils/toast-message-handler";

export const useRegister = () => {
  const queryClient = useQueryClient();

  const { mutate: register, isPending: isRegisterPending } = useMutation({
    mutationKey: ["register"],
    mutationFn: ({
      values,
      recaptcha,
    }: {
      values: RegisterSchemaType;
      recaptcha?: string;
    }) => {
      return authService.register(values, recaptcha);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast.success("User registered successfully", {
        description: "Please check your email for verification",
      });
    },
    onError: error => {
      console.log(error);
      toastMessageHandler(error);
    },
  });

  return { register, isRegisterPending };
};
