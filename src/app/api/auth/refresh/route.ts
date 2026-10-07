import { NextResponse } from "next/server";
import { signAccessToken, verifyRefreshToken } from "../../../../lib/auth";

export async function POST(req: Request) {
  try {
    const refreshTokenCookie = req.headers.get("cookie")?.split("; ").find(c => c.startsWith("refreshToken="));
    const refreshToken = refreshTokenCookie?.split("=")[1];

    if (!refreshToken) {
      return NextResponse.json({ error: "No refresh token" }, { status: 401 });
    }

    const payload = await verifyRefreshToken(refreshToken);
    if (!payload) {
      return NextResponse.json({ error: "Invalid refresh token" }, { status: 401 });
    }

    // Generate new access token
    const newPayload = { userId: payload.userId, email: payload.email, role: payload.role };
    const newAccessToken = await signAccessToken(newPayload);

    const response = NextResponse.json({ success: true });

    response.cookies.set("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 15 * 60, // 15 minutes
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
