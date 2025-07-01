import { NextResponse, type NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  const { url, cookies } = request;

  const session = cookies.get("session")?.value;

  const isAuthPage = url.includes("/auth");

  if (isAuthPage && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!isAuthPage && !session) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*", "/dashboard/:path*"],
};
