import { Router } from 'express';
import userRouter from './users';
import fileRouter from './files';

const router = Router();

router.use('/', userRouter);
router.use('/file', fileRouter);

export default router;
