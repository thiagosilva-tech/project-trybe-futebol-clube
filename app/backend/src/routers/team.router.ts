import { Router } from 'express';
import teamController from '../controllers/team.controller';

const teamRouter = Router();

teamRouter.get('/', teamController.getAll);

export default teamRouter;
