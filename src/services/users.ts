import { prisma } from "../../lib/prisma.js";

export const createUser = async (user: { id: string, password: string }) => {
  return prisma.user.create({ data: user });
}

export const getUser = async () => {
  return prisma.user.findFirstOrThrow();
}

export const logout = async (id: string) => {
  return prisma.user.update({ where: { id }, data: { logout: true } });
}
