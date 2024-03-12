import ILeaderboard from './ILeaderboard';

export type ILeaderboardModel = {
  getLeaderboardHome(): Promise<ILeaderboard[] | undefined>
  getLeaderboardAway(): Promise<ILeaderboard[] | undefined>
  getLeaderboard(): Promise<ILeaderboard[] | undefined>
};
