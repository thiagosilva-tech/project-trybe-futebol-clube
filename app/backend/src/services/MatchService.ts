import { IMatchCreate } from '../Interfaces/matches/IMatchCreate';
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

  public async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number):
  Promise<ServiceResponse<ServiceMessage>> {
    const match = await this.matchModel.updateMatch(id, homeTeamGoals, awayTeamGoals);
    if (match.message === 'ERROR') {
      return { status: 'NOT_FOUND', data: { message: 'Match Not Found.' } };
    }
    return { status: 'SUCCESSFUL', data: match };
  }

  public async createMatch(match: IMatchCreate): Promise<ServiceResponse<IMatch | ServiceMessage>> {
    const result = await this.matchModel.createMatch(match);

    if ('message' in result && result.message === 'There is no team with such id!') {
      return { status: 'NOT_FOUND', data: result };
    }

    if ('message' in result && result.message
    === 'It is not possible to create a match with two equal teams') {
      return { status: 'UNPROCESSABLE_ENTITY', data: result };
    }
    return { status: 'CREATED', data: result };
  }
}
