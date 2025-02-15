import { NextResponse } from "next/server";
import { authRoutes, publicRoutes } from "./routes";
import { auth as middleware } from "@/auth";

const DEFAULT_REDIRECT = "/";
const LOGOUT_ROUTE = "/auth/logout";

export const runtime = "nodejs";

export default middleware((req): NextResponse => {
  const { nextUrl, auth = null } = req;
  const url = nextUrl.clone();
  const isAuth = !!auth;

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isLogoutRoute = nextUrl.pathname === LOGOUT_ROUTE;
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  if (!isAuth) {
    if (isAuthRoute || isLogoutRoute) {
      return NextResponse.redirect(new URL(DEFAULT_REDIRECT, url));
    }

    return NextResponse.next();
  }

  if (isPublicRoute) {
    return NextResponse.redirect(new URL(DEFAULT_REDIRECT, url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
