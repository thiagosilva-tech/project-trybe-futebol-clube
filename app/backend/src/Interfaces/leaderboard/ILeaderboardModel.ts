import ILeaderboard from './ILeaderboard';

export type ILeaderboardModel = {
  getLeaderboardHome(): Promise<ILeaderboard[] | undefined>
};
