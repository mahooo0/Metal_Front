"use client";

import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { authService } from "@/features/auth/services";

import { toastMessageHandler } from "@/shared/utils/toast-message-handler";

export const useProviderLogin = () => {
  const { mutateAsync: providerLogin, isPending: isProviderLoginPending } =
    useMutation({
      mutationKey: ["oauth-login"],
      mutationFn: ({ provider }: { provider: "google" }) => {
        return authService.oauthByProvider(provider);
      },
      onSuccess: (data: any) => {
        if (data.message) {
          toastMessageHandler(data.message);
        } else {
          toast.success("Redirecting to provider...");
        }
      },
      onError: error => {
        console.log(error);
        toastMessageHandler(error);
      },
    });

  return { providerLogin, isProviderLoginPending };
};
