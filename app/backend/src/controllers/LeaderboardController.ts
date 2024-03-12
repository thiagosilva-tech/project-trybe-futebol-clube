import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) {}

  public async getLeaderboardHome(_req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.getLeaderboardHome();
    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getLeaderboardAway(_req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.getLeaderboardAway();
    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getLeaderboard(_req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.getLeaderboard();
    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
