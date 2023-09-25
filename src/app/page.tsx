import HomePage from './home-page';
import prisma from '@/lib/prisma';
import { Label } from '@prisma/client';

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

export default async function Page() {
  const contentSlider = await getHomeContents(Label.SLIDER);
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

  return <HomePage images={contentSlider.images} />;
}
