import React from "react";

import { Loader } from "lucide-react";

export const VerificationLoader = (
  { message = "Verifying your email..." }: { message?: string }
) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader className="w-10 h-10 animate-spin" />
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  );
};
