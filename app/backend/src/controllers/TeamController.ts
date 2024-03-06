import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) {}

  public async getAllTeams(req: Request, res: Response) {
    const serviceResponse = await this.teamService.getAllTeams();
    res.status(201).json(serviceResponse.data);
  }

  public async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this.teamService.getTeamById(Number(id));

    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
