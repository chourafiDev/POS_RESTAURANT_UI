import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authRoutes, protectedRoutes } from "@/router/routes";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("currentUser")?.value;

  const url = new URL(request.url);
  const pathname = url.pathname;

  if (protectedRoutes.includes(pathname) && !currentUser) {
    console.log("currentUser in dashboard");
    const response = NextResponse.redirect(new URL("/en/login", request.url));
    response.cookies.delete("currentUser");

    return response;
  }

  if (authRoutes.includes(pathname) && currentUser) {
    console.log("currentUser in login");
    return NextResponse.redirect(new URL("/en/dashboard", request.url));
  }
}
