import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAccessToken, verifyRefreshToken, signAccessToken } from "./lib/auth";

// Protected routes
const protectedPaths = ["/api/admin", "/admin"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = protectedPaths.some(p => pathname.startsWith(p));

  if (isProtected) {
    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;
    const isApiRequest = pathname.startsWith("/api/");

    let payload = accessToken ? await verifyAccessToken(accessToken) : null;
    let newAccessToken = null;

    if (!payload && refreshToken) {
      // Attempt to refresh the session
      const refreshPayload = await verifyRefreshToken(refreshToken);
      if (refreshPayload) {
        const newPayload = { 
          userId: refreshPayload.userId, 
          email: refreshPayload.email, 
          role: refreshPayload.role 
        };
        newAccessToken = await signAccessToken(newPayload);
        payload = newPayload;
      }
    }

    if (!payload) {
      if (isApiRequest) {
        return NextResponse.json({ error: "Unauthorized or Token Expired" }, { status: 401 });
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

    if (newAccessToken) {
      // Update request headers for server actions/components down the line
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("cookie", `accessToken=${newAccessToken}; ${request.headers.get("cookie") || ""}`);
      
      const response = NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });

      response.cookies.set("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 15 * 60, // 15 minutes
      });
      
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/admin/:path*", "/admin/:path*"],
};
