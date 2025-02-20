import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET }); //getting the token

  console.log("Middleware: Token ->", token); // Debugging

  // Allow access to landing page and API routes
  if (req.nextUrl.pathname === "/" || req.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // If user is not authenticated, redirect to landing page
  if (!token) {
    console.log("Middleware: No token found. Redirecting to /");
    return NextResponse.redirect(new URL("/", req.url));
  }

  console.log("Middleware: Token found. Access granted.");
  return NextResponse.next();
}

// Apply middleware to protected routes
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"], // Protect these pages
};
