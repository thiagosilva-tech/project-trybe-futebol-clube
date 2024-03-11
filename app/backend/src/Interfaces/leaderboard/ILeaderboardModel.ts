import { ILeaderboard } from './ILeaderboard';

export type ILeaderboardModel = {
  getLeaderboard(): Promise<ILeaderboard[] | undefined>
};
