import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log("Middleware: Token ->", token);

  if (req.nextUrl.pathname === "/" || req.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next();
  } 


  if (!token) {
    console.log("Middleware: No token found. Redirecting to /");
    return NextResponse.redirect(new URL("/", req.url));
  }

  console.log("Middleware: Token found. Access granted.");
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};


