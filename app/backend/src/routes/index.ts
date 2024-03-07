import { Router } from 'express';
import teamRouter from './teams.routes';
import userRouter from './users.routes';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', userRouter);

export default router;