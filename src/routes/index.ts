import { Router } from 'express';
import userRouter from './users';
import fileRouter from './files';

const router = Router();

router.post('/signup', createUserHandler);
router.post('/signin', loginHandler);
router.post('/signin/new_token', loginHandler);

router.use('/', userRouter);
router.use('/file', fileRouter);

export default router;
