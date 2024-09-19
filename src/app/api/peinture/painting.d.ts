import { Prisma } from "@prisma/client";
import { getPaintingsFull } from "@/app/api/peinture/getPaintings";

const paintingFull = Prisma.validator<Prisma.PaintingDefaultArgs>()({
  include: { category: true },
});

export type PaintingFull = Prisma.PaintingGetPayload<typeof paintingFull>;

export type PaintingsFull = Prisma.PromiseReturnType<typeof getPaintingsFull>;
