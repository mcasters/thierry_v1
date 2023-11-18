import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized: ({ req, token }) => {
      if (req.nextUrl.pathname.startsWith("/admin")) {
        return !!token;
      }
    },
  },
});

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/((?!api|_next/static|_next/image|images|favicon.ico).*)",
  ],
};
