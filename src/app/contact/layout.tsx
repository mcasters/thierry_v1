import { getPaintingCategoriesForMenu } from '@/app/api/peinture/category/getCategories';
import { getSculptureCategoriesForMenu } from '@/app/api/sculpture/category/getCategories';
import Layout from '@/components/layout-components/Layout';

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const paintingCategories = await getPaintingCategoriesForMenu();
  const sculptureCategories = await getSculptureCategoriesForMenu();

  return (
    <Layout
      paintingCategories={paintingCategories}
      sculptureCategories={sculptureCategories}
    >
      {children}
    </Layout>
  );
}
