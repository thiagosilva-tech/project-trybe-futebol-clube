import { Request, Router, Response } from 'express';
import MatchController from '../controllers/MatchController';
import Validations from '../middlewares/Validations';

const matchController = new MatchController();

const matchRouter = Router();

matchRouter
  .get('/', (req: Request, res: Response) => matchController.getAllMatches(req, res))
  .patch(
    '/:id/finish',
    Validations.validateToken,
    (req: Request, res: Response) => matchController.finishMatch(req, res),
  )
  .patch(
    '/:id',
    Validations.validateToken,
    Validations.validateFieldsMatchUpdate,
    (req: Request, res: Response) => matchController.updateMatch(req, res),
  ).post(
    '/',
    Validations.validateToken,
    Validations.validateFieldsMatches,
    (req: Request, res: Response) => matchController.createMatch(req, res),
  );

export default matchRouter;
