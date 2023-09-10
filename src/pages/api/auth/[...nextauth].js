import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../../lib/prisma';
import { compare } from 'bcrypt';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'coucou@ouhou.fr',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        if (!email || !password) {
          throw new Error('Missing email or password');
        }
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!user) throw new Error('Invalid email');

        compare(password, user.password, (err, res) => {
          if (err || !res) throw new Error('Invalid password');
        });

        return user;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },
  jwt: {
    maxAge: 24 * 60 * 60,
    secret: process.env.JWT_SECRET,
  },
  debug: false,
};

export default NextAuth(authOptions);
