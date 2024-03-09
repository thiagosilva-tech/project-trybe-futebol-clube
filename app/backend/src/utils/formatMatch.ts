import { IMatch } from '../Interfaces/matches/IMatch';

function formatMatch(match: IMatch) {
  return {
    id: match.id,
    homeTeamId: match.homeTeamId,
    homeTeamGoals: match.homeTeamGoals,
    awayTeamId: match.awayTeamId,
    awayTeamGoals: match.awayTeamGoals,
    inProgress: match.inProgress,
    homeTeam: {
      teamName: match.homeTeam?.teamName,
    },
    awayTeam: {
      teamName: match.awayTeam?.teamName,
    },
  };
}

export default formatMatch;
