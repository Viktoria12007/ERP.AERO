import { Router } from 'express';
import {
  createFileHandler,
  deleteFileHandler,
  downloadFileHandler,
  getFileHandler,
  getFilesHandler,
  updateFileHandler
} from "../controllers/files.js";

const router = Router();

router.get('/list', getFilesHandler);
router.get('/:id', getFileHandler);
router.get('/download/:id', downloadFileHandler);
router.post('/upload', createFileHandler);
router.put('/update/:id', updateFileHandler);
router.delete('/delete/:id', deleteFileHandler);

export default router;
