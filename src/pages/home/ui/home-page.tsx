import Link from "next/link";

import { Button } from "@/shared/ui";

export function HomePage() {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Home Page</h1>
      <Button asChild>
        <Link href="/auth/login">Login</Link>
      </Button>
    </main>
  );
}
