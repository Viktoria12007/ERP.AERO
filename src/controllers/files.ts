import type { NextFunction, Request, Response } from "express";
import * as fileService from "../services/files.js";
import path from "path";

export const getFilesHandler = async (req: Request, res: Response) => {
    const { listSize, page } = req.query;
    const files = await fileService.getFiles(listSize ? Number(listSize) : undefined, page ? Number(req.query.page) : undefined);
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

export const downloadFileHandler = async (req: Request, res: Response, next: NextFunction) => {

};

export const uploadFileHandler = async (req: Request, res: Response) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const ext = path.extname(file.originalname).replace('.', '');
    const newFile = await fileService.createFile({
      name: file.filename,
      extension: ext,
      mimeType: file.mimetype,
      size: file.size,
    });

    res.status(201).json(newFile);
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
