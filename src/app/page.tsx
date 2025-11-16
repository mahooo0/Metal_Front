import { cookies } from "next/headers";
import Link from "next/link";

import { AUTH_URLS } from "@/features/auth/constants";

import { api } from "@/shared/api";
import { Button } from "@/shared/ui/button";

export default async function Home() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;
  let isAuthenticated = false;

  if (refreshToken) {
    const cookieHeader = cookieStore
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join("; ");

    try {
      await api.get(AUTH_URLS.me, {
        headers: { cookie: cookieHeader },
      });
      isAuthenticated = true;
    } catch {
      // ignore and render default content
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Button>
        <Link href={isAuthenticated ? "/dashboard" : "/auth/login"}>
          {isAuthenticated ? "Go to Dashboard" : "Login"}
        </Link>
      </Button>
    </div>
  );
}
