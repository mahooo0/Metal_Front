import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { useMutation } from "@tanstack/react-query";

import { authService } from "@/features/auth/services";

export function useLogout() {
  const router = useRouter();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      toast.success("Logged out successfully");
      router.push("/auth/login");
    },
    onError: () => {
      toast.error("Failed to logout");
    },
  });

  return { logout, isPending };
}
