import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { deleteAllFiles, getHorsePath } from "@/utils/serverSideUtils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // @ts-ignore
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const id = Number(req.query.id);

    let horseDeleted = null;
    const horse = await prisma.horse.findUnique({
      where: { id },
    });

    if (horse) {
      await prisma.achievement.deleteMany({
        where: {
          horseId: id,
        },
      });
      const dir = getHorsePath(horse.name);
      if (deleteAllFiles(dir)) {
        horseDeleted = await prisma.horse.delete({
          where: { id },
        });
      }
    }
    return horseDeleted
      ? res.status(200).redirect("/admin")
      : res.status(404).json({ error: `No horse found.` });
  } else {
    return res.status(401).send({ error: "Unauthorized" });
  }
}
