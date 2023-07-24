import { PrismaClient } from "@prisma/client";

let prismaInstance = null;

const getPrismaClient = () => {
  if (!prismaInstance) {
    prismaInstance = new PrismaClient();
  }
  return prismaInstance;
};

export default getPrismaClient;
