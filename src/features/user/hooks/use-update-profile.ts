import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { type SettingsSchemaType } from "@/features/user/schemas";
import { userService } from "@/features/user/services";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: (data: SettingsSchemaType) => userService.updateProfile(data),
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to update profile");
    },
  });

  return {
    updateProfile,
    isPending,
  };
};