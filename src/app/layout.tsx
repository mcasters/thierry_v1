import { Metadata } from 'next';
import { getServerSession } from 'next-auth/next';

import { Label, PaintingCategory } from '@prisma/client';
import Layout from '@/components/layout-components/Layout';
import { Providers } from './context/providers';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { getPaintingCategories } from '@/app/api/peinture/category/getCategories';
import { getSculptureCategories } from '@/app/api/sculpture/category/getCategories';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
};

async function getHomeContents(label: Label) {
  const res = await prisma.content.findMany({
    where: {
      label,
    },
    include: {
      images: true,
    },
  });
  return JSON.parse(JSON.stringify(res[0]));
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const introContent = await getHomeContents(Label.INTRO);
  const paintingCategories = await getPaintingCategories();
  const sculptureCategories = await getSculptureCategories();

  if (paintingCategories.length > 0)
    paintingCategories.push({
      key: 'no-category',
      value: 'Sans catégorie',
      id: undefined,
    } as PaintingCategory);

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
