import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { verificationsService } from "@/features/auth/services";

import { toastMessageHandler } from "@/shared/utils";

export const useVerification = () => {
  const router = useRouter();

  const { mutate: verification } = useMutation({
    mutationKey: ["verification"],
    mutationFn: ({ token }: { token: string | null }) => {
      return verificationsService.newVerification(token);
    },
    onSuccess: () => {
      toast.success("Email verified successfully");
      router.replace("/dashboard");
    },
    onError: error => {
      toastMessageHandler(error);
      router.replace("/auth/login");
    },
  });

  return { verification };
};
