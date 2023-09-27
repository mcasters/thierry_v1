import HomePage from '../components/home/HomePage';
import { Label } from '@prisma/client';
import {
  getContentFullByLabel,
  getContentsFull,
} from '@/app/api/content/getContents';
import { getPaintingCategoriesForMenu } from '@/app/api/peinture/category/getCategories';
import { getSculptureCategoriesForMenu } from '@/app/api/sculpture/category/getCategories';
import Layout from '@/components/layout-components/Layout';
import { getHomeContent, getPresentationContent } from '@/utils/common';

export default async function Page() {
  // This request should be cached until manually invalidated.
  // Similar to `getStaticProps`.
  // `force-cache` is the default and can be omitted.
  // const staticData = await fetch(`https://...`, { cache: 'force-cache' });

  // This request should be refetched on every request.
  // Similar to `getServerSideProps`.
  // const dynamicData = await fetch(`https://...`, { cache: 'no-store' });

  // This request should be cached with a lifetime of 10 seconds.
  // Similar to `getStaticProps` with the `revalidate` option.
  // const revalidatedData = await fetch(`https://...`, {
  //   next: { revalidate: 10 },
  // });
  const contents = await getContentsFull();
  const { introContent, sliderContent } = getHomeContent(contents);
  const paintingCategories = await getPaintingCategoriesForMenu();
  const sculptureCategories = await getSculptureCategoriesForMenu();

  return (
    <Layout
      introduction={introContent.text}
      paintingCategories={paintingCategories}
      sculptureCategories={sculptureCategories}
    >
      <HomePage images={sliderContent.images} />
    </Layout>
  );
}
