import { Metadata } from 'next';
import { getServerSession } from 'next-auth/next';

import { Label, PaintingCategory } from '@prisma/client';
import Layout from '@/components/layout-components/Layout';
import { Providers } from './context/providers';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { getPaintingCategoriesForMenu } from '@/app/api/peinture/category/getCategories';
import { getSculptureCategories } from '@/app/api/sculpture/category/getCategories';
import '@/styles/globals.css';
import { getContentFullByLabel } from '@/app/api/content/getContents';
import { getSculptureCategoriesForMenu } from '@/app/api/sculpture/getSculptures';

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
  const introContent = await getContentFullByLabel(Label.INTRO);
  const paintingCategories = await getPaintingCategoriesForMenu();
  const sculptureCategories = await getSculptureCategoriesForMenu();

  return (
    <html lang="fr">
      <body>
        <Providers session={session}>
          <Layout
            introduction={introContent.text}
            paintingCategories={paintingCategories}
            sculptureCategories={sculptureCategories}
          >
            {children}
          </Layout>
        </Providers>
      </body>
    </html>
  );
}
