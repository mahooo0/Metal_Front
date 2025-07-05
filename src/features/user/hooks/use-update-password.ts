import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { type UpdatePasswordSchemaType } from "@/features/user/schemas";
import { userService } from "@/features/user/services";

export const useUpdatePassword = () => {
  const { mutate: updatePassword, isPending } = useMutation({
    mutationFn: (
      data: Pick<UpdatePasswordSchemaType, "currentPassword" | "newPassword">
    ) => userService.updatePassword(data),
    onSuccess: () => {
      toast.success("Password updated successfully!");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to update password");
    },
  });

  return {
    updatePassword,
    isPending,
  };
};