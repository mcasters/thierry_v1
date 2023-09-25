import { Metadata } from 'next';

import Layout from '@/components/layout-components/Layout';
import { Providers } from './providers';
import '@/styles/globals.css';
import { Label, PaintingCategory } from '@prisma/client';
import prisma from '@/lib/prisma';
import { getPaintingCategories } from '@/app/api/peinture/categories/getCategories';
import { getSculptureCategories } from '@/app/api/sculpture/categories/getCategories';

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
        <Providers>
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
