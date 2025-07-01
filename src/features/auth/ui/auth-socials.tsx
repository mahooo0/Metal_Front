"use client";

import { FaGoogle } from "react-icons/fa";

import { useProviderLogin } from "@/features/auth/hooks";

import { Button } from "@/shared/ui";

export function AuthSocials() {
  const { providerLogin, isProviderLoginPending } = useProviderLogin();

  const handleProviderLogin = async (provider: "google") => {
    const response = await providerLogin({ provider });

    if (response.url) {
      window.location.href = response.url;
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleProviderLogin("google")}
          disabled={isProviderLoginPending}>
          <FaGoogle className="mr-2 size-4" />
          Continue with Google
        </Button>
      </div>
      <div className="relative my-4 space-y-4">
        <div className="absolute inset-0 top-1/2 flex items-center">
          <span className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex items-center justify-center text-xs uppercase">
          <span className="bg-background text-muted-foreground px-2 text-xs">
            Or continue with
          </span>
        </div>
      </div>
    </>
  );
}
