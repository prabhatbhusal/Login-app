// middleware.ts
import { NextResponse } from "next/server";
import  auth  from "next-auth";

export default auth((req: { auth: any; nextUrl: { pathname: any; }; url: string | URL | undefined; }) => {
  const session = req.auth;
  const { pathname } = req.nextUrl;

  // If not logged in, redirect to login
  if (!session?.user) {
    if (pathname !== "/login") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  // Role-based redirection
  if (session.user.role === "admin" && !pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }
  if (session.user.role === "user" && !pathname.startsWith("/user")) {
    return NextResponse.redirect(new URL("/jobs", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/jobs/:path*", "/login"],
};