import { ILeaderboard } from '../Interfaces/leaderboard/ILeaderboard';
import { ITeam } from '../Interfaces/teams/ITeam';

function formatLeaderboardWithId(teams: ITeam[]) {
  return teams.map((team) => ({
    name: team.teamName,
    teamId: team.id,
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
  }));
}

function formatLeaderboard(leaderboards: ILeaderboard[]) {
  return leaderboards.map((leaderboard) => ({
    name: leaderboard.name,
    totalPoints: leaderboard.totalPoints,
    totalGames: leaderboard.totalGames,
    totalVictories: leaderboard.totalVictories,
    totalDraws: leaderboard.totalDraws,
    totalLosses: leaderboard.totalLosses,
    goalsFavor: leaderboard.goalsFavor,
    goalsOwn: leaderboard.goalsOwn,
  }));
}

export { formatLeaderboardWithId, formatLeaderboard };
