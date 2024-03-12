import LeaderboardAway from '../utils/LeaderboardAway';
import sortLeaderboard from '../utils/sortLeaderboard';
import IncludesMatches from '../services/IncludesMatches';
import ILeaderboard from '../Interfaces/leaderboard/ILeaderboard';
import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { ILeaderboardModel } from '../Interfaces/leaderboard/ILeaderboardModel';
import LeaderboardHome from '../utils/LeaderboardHome';

export default class LeaderboardModel implements ILeaderboardModel {
  private modelTeam = SequelizeTeam;
  private modelMatches = SequelizeMatch;

  public async getLeaderboardHome(): Promise<ILeaderboard[]> {
    const teams = await this.modelTeam.findAll();
    const matches = await this.modelMatches
      .findAll({
        where: { inProgress: false },
        include: IncludesMatches,
      });
    const leaderboard = teams.map((team) => {
      const leaderboardClass = new LeaderboardHome(team, matches);
      return leaderboardClass.getLeaderboard();
    });
    return sortLeaderboard(leaderboard);
  }

  public async getLeaderboardAway(): Promise<ILeaderboard[]> {
    const teams = await this.modelTeam.findAll();
    const matches = await this.modelMatches
      .findAll({
        where: { inProgress: false },
        include: IncludesMatches,
      });
    const leaderboard = teams.map((team) => {
      const leaderboardClass = new LeaderboardAway(team, matches);
      return leaderboardClass.getLeaderboard();
    });
    return sortLeaderboard(leaderboard);
  }
}
