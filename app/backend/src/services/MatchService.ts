import MatchModel from '../models/MatchModel';
import { IMatch } from '../Interfaces/matches/IMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) {}

  public async getAllMatches(inProgress: string | undefined): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchModel.findAll(inProgress);

    return { status: 'SUCCESSFUL', data: matches };
  }

  public async finishMatch(id: number): Promise<ServiceResponse<ServiceMessage>> {
    const match = await this.matchModel.finishMatch(id);
    if (match.message === 'ERROR') {
      return { status: 'NOT_FOUND', data: { message: 'Match Not Found or Already Finished.' } };
    }
    return { status: 'SUCCESSFUL', data: match };
  }
}
