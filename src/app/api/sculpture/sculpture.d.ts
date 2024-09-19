// const sculptureFull = Prisma.validator<Prisma.SculptureDefaultArgs>()({
//   include: {
//     images: true,
//     category: true,
//   },
// });
// export type SculptureFull = Prisma.SculptureGetPayload<typeof sculptureFull>;

// const sculptureSelect = {
//   id: true,
//   title: true,
//   type: true,
//   date: true,
//   technique: true,
//   description: true,
//   height: true,
//   width: true,
//   length: true,
//   isToSell: true,
//   price: true,
//   sold: true,
//   images: [
//     {
//       id: true,
//       filename: true,
//       height: true,
//       width: true,
//       isMain: true,
//     },
//   ],
//   category: {
//     id: true,
//     key: true,
//     value: true,
//   },
// } satisfies Prisma.SculptureSelect;
//
// export type SculptureFull = Prisma.SculptureGetPayload<{
//   select: typeof sculptureSelect;
// }>;
