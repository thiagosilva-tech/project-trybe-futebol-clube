import { Request, Response, Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRouter = Router();

const leaderboardController = new LeaderboardController();

leaderboardRouter
  .get(
    '/home',
    (req: Request, res: Response) => leaderboardController.getLeaderboardHome(req, res),
  );

export default leaderboardRouter;