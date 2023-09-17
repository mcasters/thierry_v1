import { GetServerSideProps } from 'next';
import Image from 'next/image';

import s from '@/styles/Home.module.css';
import Layout from '../components/layout-components';
import HomePart from '@/components/home/HomePart';
import HomeContactPart from '@/components/home/HomeContactPart';
import prisma from '@/lib/prisma';
import { Content } from '@/interfaces';
import React from 'react';
import { Label } from '@prisma/client';

export type Props = {
  contents: [Content];
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await prisma.content.findMany({
    orderBy: {
      label: 'asc',
    },
  });
  const contents = JSON.parse(JSON.stringify(res));
  return {
    props: {
      contents,
    },
  };
};

export default function Home({ contents }: Props) {
  let introduction = undefined;
  const res = contents.filter((content) => content.label === Label.INTRO);
  if (res.length) introduction = res[0].text;

  return (
    <Layout introduction={introduction}>
      <div className={s.main}>
        <div className={s.center}>
          <Image
            className={s.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
        </div>
        <div className={s.grid}>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={s.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Docs <span>-&gt;</span>
            </h2>
            <p>
              Find in-depth information about Next.js features and&nbsp;API.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={s.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Learn <span>-&gt;</span>
            </h2>
            <p>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </a>

          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={s.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Templates <span>-&gt;</span>
            </h2>
            <p>
              Discover and deploy boilerplate example Next.js&nbsp;projects.
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={s.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Deploy <span>-&gt;</span>
            </h2>
            <p>
              Instantly deploy your Next.js site to a shareable URL
              with&nbsp;Vercel.
            </p>
          </a>
        </div>
      </div>
      {contents.map((content) => {
        if (content.label !== Label.INTRO) {
          return (
            <HomePart
              key={content.id}
              title={content.title}
              content={content.text}
              imageSrc={`/images/miscellaneous/${content.filename}`}
            />
          );
        }
      })}
      <HomeContactPart title="Contact" imageSrc="2.jpeg" />
    </Layout>
  );
}
