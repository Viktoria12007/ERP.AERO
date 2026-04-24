import type { Request, Response } from "express";
import * as fileService from "../services/files.js";

export const getFilesHandler = async (req: Request, res: Response) => {
    const files = await fileService.getFiles(Number(req.query.listSize), Number(req.query.page));
    res.json(files);
};

export const getFileHandler = async (req: Request, res: Response) => {
  try {
    const file = await fileService.getFile(Number(req.params.id));
    res.json(file);
  } catch (err) {
    // if (err.code === 'P2025') {
    //   res.status(404).json({ error: 'File not found' });
    // }
  }
};

export const downloadFileHandler = async (req: Request, res: Response) => {
  // try {
  //   const user = await fileService.getUser(req.body);
  //   res.json(user.id);
  // } catch (err) {
  //   if (err.code === 'P2025') {
  //     res.status(404).json({ error: 'User not found' });
  //   }
  // }
};

export const createFileHandler = async (req: Request, res: Response) => {
  try {
    const file = await fileService.createFile(req.body);
    res.status(201).json(file);
  } catch {
    res.status(400).json({ error: 'File creation failed' });
  }
};

export const updateFileHandler = async (req: Request, res: Response) => {
  try {
    const fileId = await fileService.getFile(Number(req.params.id)).then(file => file.id);
    const updatedFile = await fileService.updateFile(fileId, req.body);
    res.json(updatedFile);
  } catch (err) {
    // if (err.code === 'P2025') {
    //   res.status(404).json({ error: 'File not found' });
    // }
  }
};

export const deleteFileHandler = async (req: Request, res: Response) => {
  try {
    const file = await fileService.getFile(Number(req.params.id));
    await fileService.deleteFile(Number(file.id));
    res.json(file);
  } catch (err) {
    // if (err.code === 'P2025') {
    //   res.status(404).json({ error: 'File not found' });
    // }
  }
};
