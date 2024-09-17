import { Prisma } from "@prisma/client";
import { getSculpturesFull } from "@/app/api/sculpture/getSculptures";

const sculptureFull = Prisma.validator<Prisma.SculptureDefaultArgs>()({
  include: { images: true, category: true },
});

export type SculptureFull = Prisma.SculptureGetPayload<typeof sculptureFull>;

export type SculpturesFull = Prisma.PromiseReturnType<typeof getSculpturesFull>;
