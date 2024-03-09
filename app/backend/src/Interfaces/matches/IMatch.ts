import { Identifiable } from '..';

export interface IMatch extends Identifiable {
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
  homeTeam?: {
    teamName: string | undefined,
  },
  awayTeam?: {
    teamName: string | undefined,
  },
}
