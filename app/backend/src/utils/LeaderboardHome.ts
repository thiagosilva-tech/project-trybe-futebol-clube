import ILeaderboard from '../Interfaces/leaderboard/ILeaderboard';
import { IMatch } from '../Interfaces/matches/IMatch';
import { ITeam } from '../Interfaces/teams/ITeam';

export default class LeaderboardHome {
  private _team: ITeam;
  private _matches: IMatch[];

  constructor(team: ITeam, matches: IMatch[]) {
    this._team = team;
    this._matches = matches;
  }

  private matchesForTeam(): IMatch[] {
    return this._matches.filter((match: IMatch) =>
      match.homeTeam?.teamName === this._team.teamName);
  }

  getGames(): number {
    return this.matchesForTeam().length;
  }

  getVictories(): number {
    return this
      .matchesForTeam().filter((match) => match.homeTeamGoals > match.awayTeamGoals).length;
  }

  getLosses(): number {
    return this
      .matchesForTeam().filter((match) => match.homeTeamGoals < match.awayTeamGoals).length;
  }

  getDraws(): number {
    return this
      .matchesForTeam().filter((match) => match.homeTeamGoals === match.awayTeamGoals).length;
  }

  getPoints(): number {
    const victories = this.getVictories();
    const draws = this.getDraws();
    return victories * 3 + draws;
  }

  getGoalsFavor(): number {
    return this.matchesForTeam().reduce((acc, match) => acc + match.homeTeamGoals, 0);
  }

  getGoalsOwn(): number {
    return this.matchesForTeam().reduce((acc, match) => acc + match.awayTeamGoals, 0);
  }

  getEfficiency() {
    const games = this.getGames();
    const points = this.getPoints();
    return ((points / (games * 3)) * 100).toFixed(2);
  }

  getLeaderboard(): ILeaderboard {
    const goalsFavor = this.getGoalsFavor();
    const goalsOwn = this.getGoalsOwn();
    const goalsBalance = goalsFavor - goalsOwn;
    return {
      name: this._team.teamName,
      totalPoints: this.getPoints(),
      totalGames: this.getGames(),
      totalVictories: this.getVictories(),
      totalDraws: this.getDraws(),
      totalLosses: this.getLosses(),
      goalsFavor,
      goalsOwn,
      goalsBalance,
      efficiency: this.getEfficiency(),
    };
  }
}
