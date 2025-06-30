import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const { cookies, nextUrl: url } = req;
  const pathname = url.pathname;

  const protectedPaths = [
    "/dashboard",
    "/profile",
    "/orders",
    "/cart",
    "/admin",
  ];

  const isProtectedPath = protectedPaths.some((path) =>
    pathname.toLowerCase().includes(path.toLowerCase())
  );

  const isAdminRoute = pathname.toLowerCase().includes("/admin");

  if (isProtectedPath) {
    const accessToken = cookies.get("accessToken")?.value;
    if (!accessToken) {
      const locale = url.pathname.split("/")[1];

      if (isAdminRoute) {
        const loginUrl = new URL(`/${locale}/admin/login`, url.origin);
        loginUrl.search = url.search;
        return NextResponse.redirect(loginUrl);
      }

      const loginUrl = new URL(`/${locale}/login`, url.origin);
      loginUrl.search = url.search;
      return NextResponse.redirect(loginUrl);
    }
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
