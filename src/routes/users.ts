import { Router } from 'express';
import { getInfoUserHandler, logoutHandler } from "../controllers/users";

const router = Router();

router.get('/info', getInfoUserHandler);
router.get('/logout', logoutHandler);

export default router;
