import { ServiceMessage } from '../ServiceResponse';
import { IMatch } from './IMatch';
import { IMatchCreate } from './IMatchCreate';

export type IMatchModel = {
  findAll(inProgress: string | undefined): Promise<IMatch[]>
  finishMatch(id: number): Promise<ServiceMessage>
  updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<ServiceMessage>
  createMatch(match: IMatchCreate): Promise<ServiceMessage | IMatch>
};
