import { Router } from 'express';
import {
  uploadFileHandler,
  deleteFileHandler,
  downloadFileHandler,
  getFileHandler,
  getFilesHandler,
  updateFileHandler
} from "../controllers/files.js";
import { upload } from "../middlewares/upload";

const router = Router();

router.get('/list', getFilesHandler);
router.get('/:id', getFileHandler);
router.get('/download/:id', downloadFileHandler);
router.post('/upload', upload.single('file'), uploadFileHandler);
router.put('/update/:id', updateFileHandler);
router.delete('/delete/:id', deleteFileHandler);

export default router;
