import { SignJWT, jwtVerify } from "jose";

export const getAccessSecret = () => new TextEncoder().encode(process.env.JWT_ACCESS_SECRET || "default_access_secret");
export const getRefreshSecret = () => new TextEncoder().encode(process.env.JWT_REFRESH_SECRET || "default_refresh_secret");

export async function signAccessToken(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m") // 15 minutes access token
    .sign(getAccessSecret());
}

export async function signRefreshToken(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d") // 7 days refresh token
    .sign(getRefreshSecret());
}

export async function verifyAccessToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getAccessSecret());
    return payload;
  } catch (error) {
    return null;
  }
}

export async function verifyRefreshToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getRefreshSecret());
    return payload;
  } catch (error) {
    return null;
  }
}
