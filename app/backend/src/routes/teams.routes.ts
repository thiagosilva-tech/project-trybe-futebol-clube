import { Request, Router, Response } from 'express';
import TeamController from '../controllers/TeamController';

const teamController = new TeamController();

const teamRouter = Router();

teamRouter.get('/', (req: Request, res: Response) => teamController.getAllTeams(req, res));

teamRouter.get('/:id', (req: Request, res: Response) => teamController.getTeamById(req, res));

export default teamRouter;
