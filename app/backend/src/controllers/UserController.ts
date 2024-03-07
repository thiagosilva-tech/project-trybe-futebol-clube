import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import UserService from '../services/UserService';

export default class LoginController {
  constructor(
    private userService = new UserService(),
  ) {}

  public async login(req: Request, res: Response) {
    const serviceResponse = await this.userService.login(req.body);

    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getRole(_req: Request, res: Response) {
    const { id } = res.locals.payload;
    const serviceResponse = await this.userService.getUserRole(Number(id));

    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
