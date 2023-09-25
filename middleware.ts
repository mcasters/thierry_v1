import { withAuth } from 'next-auth/middleware';
export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized: ({ req, token }) => {
      return !(req.nextUrl.pathname.startsWith('/admin') && token === null);
    },
  },
});
