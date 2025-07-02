import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { RecoverySchemaType } from "@/features/auth/schemas";
import { recoveryService } from "@/features/auth/services";

import { toastMessageHandler } from "@/shared/utils";

export const useResetPassword = () => {
  const { mutate: resetPassword, isPending: isResetPasswordPending } =
    useMutation({
      mutationKey: ["resetPassword"],
      mutationFn: (values: RecoverySchemaType) => {
        return recoveryService.reset(values);
      },
      onSuccess: (data: any) => {
        if (data.message) {
          toastMessageHandler(data.message);
        } else {
          toast.success("Password reset successful", {
            description: "Check your email for a link to reset your password",
          });
        }
      },
      onError: error => {
        console.log(error);
        toastMessageHandler(error);
      },
    });

  return { resetPassword, isResetPasswordPending };
};
