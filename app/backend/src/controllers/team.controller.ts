import { Request, Response } from 'express';
import teamService from '../services/team.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function getAll(_req: Request, res: Response) {
  const serviceResponse = await teamService.getAll();
  res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
}

export default { getAll };
