import { Request, Response, Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRouter = Router();

const leaderboardController = new LeaderboardController();

leaderboardRouter
  .get(
    '/home',
    (req: Request, res: Response) => leaderboardController.getLeaderboardHome(req, res),
  )
  .get(
    '/away',
    (req: Request, res: Response) => leaderboardController.getLeaderboardAway(req, res),
  )
  .get(
    '/',
    (req: Request, res: Response) => leaderboardController.getLeaderboard(req, res),
  );

export default leaderboardRouter;
