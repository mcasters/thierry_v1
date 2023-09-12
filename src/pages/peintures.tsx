import React from "react";
import { GetServerSideProps } from "next";

import prisma from "@/lib/prisma";
import Layout from "@/components/layout/layout";
import HorseComponent from "@/components/horse/HorseComponent";
import { Horse } from "@/interfaces/index";
import s from "./horsePage.module.css";

export type PostProps = {
  horses: [Horse];
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await prisma.horse.findMany({
    where: {
      isToSell: false,
    },
    include: {
      mainImage: {
        select: { filename: true, height: true, width: true },
      },
      images: {
        select: { filename: true, width: true, height: true },
      },
    },
  });
  const horses = JSON.parse(JSON.stringify(res));
  return {
    props: {
      horses,
    },
  };
};

export default function HorsePage({ horses }: PostProps) {
  return (
    <Layout>
      <div className={s.container}>
        <section className={s.horseListSection}>
          <h1>Les chevaux</h1>
          {horses &&
            horses.map((horse) => (
              <button
                key={horse.id}
                onClick={() =>
                  document
                    .getElementById(`${horse.id}`)
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                {horse.name}
              </button>
            ))}
        </section>
        {horses.map((horse) => (
          <HorseComponent key={horse.id} horse={horse} isToSell={false} />
        ))}
      </div>
    </Layout>
  );
}
