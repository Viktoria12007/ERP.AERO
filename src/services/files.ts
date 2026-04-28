import { prisma } from "../../lib/prisma.js";
import type { FileCreateInput, FileUpdateInput } from "../../generated/prisma/models/File";

export const getFiles = async (listSize: number = 10, page: number = 1) => {
  return prisma.file.findMany({ take: listSize, skip: listSize * (page - 1) });
}

export const getFile = async (id: number) => {
  return prisma.file.findUniqueOrThrow({ where: { id } });
}

export const createFile = async (file: FileCreateInput) => {
  return prisma.file.create({ data: file });
}

export const updateFile = async (id: number, file: FileUpdateInput) => {
  return prisma.file.update({ where: { id }, data: file });
}

export const deleteFile = async (id: number) => {
  return prisma.file.delete({ where: { id } });
}
