import { Router } from 'express';
import teamRouter from './teams.routes';
import userRouter from './users.routes';
import matchRouter from './matches.routes';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', userRouter);
router.use('/matches', matchRouter);

export default router;
