import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) {}

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    const serviceResponse = await this.matchService.getAllMatches(inProgress as string | undefined);
    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this.matchService.finishMatch(Number(id));
    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
