import { Prisma } from "@prisma/client";
import { getDrawingsFull } from "@/app/api/dessin/getDrawings";

const drawingFull = Prisma.validator<Prisma.DrawingDefaultArgs>()({
  include: { category: true },
});

export type DrawingFull = Prisma.DrawingGetPayload<typeof drawingFull>;

export type DrawingsFull = Prisma.PromiseReturnType<typeof getDrawingsFull>;
