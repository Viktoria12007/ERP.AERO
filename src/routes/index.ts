import { Router, type Request, type Response, type NextFunction } from 'express';
import userRouter from './users.js';
import fileRouter from './files.js';
import { createUserHandler, getNewTokenHandler, loginHandler } from "../controllers/users.js";
import NotFoundError from "../errors/not-found-error.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.post('/signup', createUserHandler);
router.post('/signin', loginHandler);
router.post('/signin/new_token', getNewTokenHandler);

router.use(auth);
router.use('/', userRouter);
router.use('/file', fileRouter);

router.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError('Маршрут не найден'));
});

export default router;
