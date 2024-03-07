import * as bcrypt from 'bcrypt';
import UserModel from '../models/UserModel';
import { ILogin, IUser } from '../Interfaces/users/IUser';
import { IUserModel } from '../Interfaces/users/IUserModel';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import JWT from '../utils/JWT';
import { IToken } from '../Interfaces/IToken';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
    private jwtService = JWT,
  ) {}

  public async login(data: ILogin): Promise<ServiceResponse<ServiceMessage | IToken>> {
    const user = await this.userModel.findByEmail(data.email);

    if (!user) {
      return { status: 'NOT_FOUND', data: { message: 'User not found' } };
    }

    if (!bcrypt.compareSync(data.password, user.password)) {
      return { status: 'INVALID_DATA', data: { message: 'Invalid email or password' } };
    }

    const { email } = user as IUser;
    const token = this.jwtService.sign({ email });
    return { status: 'SUCCESSFUL', data: { token } };
  }

  public async getUserRole(id: number): Promise<ServiceResponse<ServiceMessage>> {
    const user = await this.userModel.findById(id);
    if (!user) {
      return { status: 'NOT_FOUND', data: { message: 'User not found' } };
    }

    return { status: 'SUCCESSFUL', data: { message: user.role } };
  }
}
