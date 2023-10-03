import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'coucou@ouhou.fr',
        },
        password: { label: 'Mot de passe', type: 'password' },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!user) return null;
        bcrypt.compare(password, user.password, (err, res) => {
          if (err || !res) return null;
        });
        return user;
      },
    }),
  ],
  session: { strategy: 'jwt' },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
