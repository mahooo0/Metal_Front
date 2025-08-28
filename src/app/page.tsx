import Link from "next/link";

import { Button } from "@/shared/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Button>
        <Link href="/auth/login">Login</Link>
      </Button>
    </div>
  );
}
