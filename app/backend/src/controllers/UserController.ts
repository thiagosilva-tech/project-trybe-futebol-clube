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
    const { email } = res.locals.token;
    const serviceResponse = await this.userService.getUserRole(email);

    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
