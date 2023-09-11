import { PrismaClient, Prisma, Painting } from '@prisma/client';
import { TYPE } from '@/constants';

const prismaClientSingleton = () => {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  }).$extends({
    result: {
      painting: {
        type: {
          compute(): string {
            return `${TYPE.PAINTING}`;
          },
        },
      },
      sculpture: {
        type: {
          compute(): string {
            return `${TYPE.SCULPTURE}`;
          },
        },
      },
    },
  });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
