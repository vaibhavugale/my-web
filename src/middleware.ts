import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAccessToken } from "./lib/auth";

// Protected routes
const protectedPaths = ["/api/admin", "/admin"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = protectedPaths.some(p => pathname.startsWith(p));

  if (isProtected) {
    const accessToken = request.cookies.get("accessToken")?.value;
    const isApiRequest = pathname.startsWith("/api/");

    if (!accessToken) {
      if (isApiRequest) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const payload = await verifyAccessToken(accessToken);
    if (!payload) {
      if (isApiRequest) {
        return NextResponse.json({ error: "Token expired or invalid" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Role check if you want to restrict to admins
    if (payload.role !== "ADMIN") {
      if (isApiRequest) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/admin/:path*", "/admin/:path*"],
};
