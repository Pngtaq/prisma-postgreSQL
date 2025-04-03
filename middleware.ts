import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Public paths that don't require authentication
  const publicPaths = ["/auth", "/login", "/register"];
  if (publicPaths.some((p) => path.startsWith(p))) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Redirect to login if not authenticated
  if (!token) {
    const redirectUrl = new URL("/auth", req.url);
    redirectUrl.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(redirectUrl);
  }

  const userRole = token.role as string;

  // Define role-based access permissions
  const rolePermissions: Record<string, string[]> = {
    SUPER_ADMIN: ["/admin", "/moderator", "/evaluator", "/scoresheet"],
    ADMIN: ["/admin", "/scoresheet"],
    MODERATOR: ["/moderator", "/scoresheet"],
    EVALUATOR: ["/evaluator", "/scoresheet"],
    USER: ["/scoresheet"],
  };

  // Check if user has permission to access the path
  const hasPermission = rolePermissions[userRole]?.some((allowedPath) =>
    path.startsWith(allowedPath)
  );

  // Allow access to dashboard for all authenticated users
  if (path === "/dashboard") {
    return NextResponse.next();
  }

  // Redirect to 403 page if user doesn't have permission
  if (!hasPermission) {
    return NextResponse.redirect(new URL("/403", req.url));
  }

  return NextResponse.next();
}
// This middleware function checks if the user is authenticated and has the necessary permissions to access specific paths based on their role. If not, it redirects them to the appropriate page (login or 403 error page).
// The matcher specifies which paths the middleware should apply to. You can adjust this based on your application's routing structure.
// The middleware function uses the NextAuth library to get the user's token and role, and it defines a set of public paths that don't require authentication. If the user is not authenticated, they are redirected to the login page with a callback URL to return to the original path after logging in.
export const config = {
  matcher: [
    "/admin/:path*",
    "/moderator/:path*",
    "/evaluator/:path*",
    "/scoresheet/:path*",
    "/dashboard/:path*",
    "/auth",
    "/login",
    "/register",
  ],
};
