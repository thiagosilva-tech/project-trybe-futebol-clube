import { ILeaderboard } from '../Interfaces/leaderboard/ILeaderboard';
import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { ILeaderboardModel } from '../Interfaces/leaderboard/ILeaderboardModel';
import {
  formatLeaderboard,
  formatLeaderboardWithId,
} from '../utils/formatLeaderboard';

export default class LeaderboardModel implements ILeaderboardModel {
  private modelTeam = SequelizeTeam;
  private modelMatches = SequelizeMatch;

  public async getLeaderboard(): Promise<ILeaderboard[]> {
    const teams = await this.modelTeam.findAll();
    const leaderboard = formatLeaderboardWithId(teams);
    const matches = await this.modelMatches.findAll({
      where: { inProgress: false },
    });
    matches.forEach((match) => {
      const homeTeam = leaderboard.find(
        (team: ILeaderboard) => team.teamId === match.homeTeamId,
      );
      const awayTeam = leaderboard.find(
        (team: ILeaderboard) => team.teamId === match.awayTeamId,
      );
      if (homeTeam && awayTeam) {
        homeTeam.totalGames += 1;
        awayTeam.totalGames += 1;
        if (match.homeTeamGoals > match.awayTeamGoals) {
          homeTeam.totalVictories += 1;
          homeTeam.totalPoints += 3;
          awayTeam.totalLosses += 1;
        } else if (match.homeTeamGoals < match.awayTeamGoals) {
          awayTeam.totalVictories += 1;
          awayTeam.totalPoints += 3;
          homeTeam.totalLosses += 1;
        } else {
          homeTeam.totalDraws += 1;
          awayTeam.totalDraws += 1;
          homeTeam.totalPoints += 1;
          awayTeam.totalPoints += 1;
        }

        homeTeam.goalsFavor += match.homeTeamGoals;
        homeTeam.goalsOwn += match.awayTeamGoals;
        awayTeam.goalsFavor += match.awayTeamGoals;
        awayTeam.goalsOwn += match.homeTeamGoals;
      }
    });

    return formatLeaderboard(leaderboard);
  }
}
