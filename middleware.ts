import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { adminRoutes, authRoutes, protectedRoutes } from "@/router/routes";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("currentUser")?.value;
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Check if the pathname is in authRoutes
  const isProtectedRoute = protectedRoutes.some((route) => {
    return pathname.startsWith(route);
  });

  if (isProtectedRoute && !currentUser) {
    const response = NextResponse.redirect(new URL("/en/login", request.url));
    response.cookies.delete("currentUser");

    return response;
  }

  // Check if the pathname is in authRoutes
  const isAuthRoute = authRoutes.some((route) => {
    return pathname.startsWith(route);
  });

  if (isAuthRoute && currentUser) {
    return NextResponse.redirect(new URL("/en/dashboard", request.url));
  }

  // Check if the pathname is in adminRoutes (admin role)
  const userInfo = currentUser && JSON.parse(currentUser);

  const isAdminRoute = adminRoutes.some((route) => {
    return pathname.startsWith(route);
  });

  if (isAdminRoute && userInfo && userInfo.role != "admin") {
    return NextResponse.redirect(new URL("/en/denied", request.url));
  }
}
