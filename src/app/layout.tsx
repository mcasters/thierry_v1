import { Metadata } from 'next';
import { getServerSession } from 'next-auth/next';

import GlobalLayout from '@/components/layout-components/GlobalLayout';
import { Providers } from './context/providers';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="fr">
      <body>
        <Providers session={session}>
          <GlobalLayout>{children}</GlobalLayout>
        </Providers>
      </body>
    </html>
  );
}
