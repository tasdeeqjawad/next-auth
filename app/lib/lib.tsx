// @refresh reset
'use server'
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);
                                                     
export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("60 sec from now")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

  // ✅ Ensure `cookies().set()` is used correctly
export const cookieStore = cookies(); // Awaiting is not needed here

export async function login(formData: FormData) {
  const user = { 
    email: formData.get("email"), 
    password: formData.get("password") 
  };

  const expires = new Date(Date.now() + 10 * 1000);
  const session = await encrypt({ user, expires });

  // ✅ Ensure `cookies().set()` is used correctly
  //const cookieStore = cookies(); // Awaiting is not needed here
  (await cookieStore).set("session", session, { 
    expires, 
    httpOnly: true, 
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/"
  });
  console.log("Cookie set");
  console.log("Session set:", session);
}

export async function logout() {
  // Destroy the session
  const cookieStore = await cookies();
  cookieStore.delete('session');
  
   (await
        // Destroy the session
        cookies()).set("session", "", { expires: new Date(0) });

}

export async function getSession() {
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 10 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}