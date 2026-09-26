import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n/config";

function pathnameHasLocale(pathname: string) {
  return locales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathnameHasLocale(pathname)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals and files with an extension (assets).
  matcher: ["/((?!_next|.*\\..*).*)"],
};
