import { ServiceMessage } from '../ServiceResponse';
import { IMatch } from './IMatch';

export type IMatchModel = {
  findAll(inProgress: string | undefined): Promise<IMatch[]>
  finishMatch(id: number): Promise<ServiceMessage>
  updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<ServiceMessage>
};
