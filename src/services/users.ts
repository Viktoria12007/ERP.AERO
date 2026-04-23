import { prisma } from "../../prisma/client";

export const getUser = async (id: string) => {
  return prisma.user.findUniqueOrThrow({ where: { id } });
}

export const logout = async (id: string) => {
  return prisma.user.update({ where: { id }, data: { logout: true } });
}
