import { ServiceMessage } from '../Interfaces/ServiceResponse';
import formatMatch from '../utils/formatMatch';
import IncludesMatches from '../services/IncludesMatches';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { IMatch } from '../Interfaces/matches/IMatch';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatch;

  async findAll(inProgress: string | undefined): Promise<IMatch[]> {
    let whereClause = {};
    if (inProgress) {
      whereClause = { inProgress: inProgress === 'true' };
    }
    const matches = await this.model.findAll({ where: whereClause, include: IncludesMatches });
    return matches.map((match) => formatMatch(match));
  }

  async finishMatch(idMatch: number): Promise<ServiceMessage> {
    const matchUpdated = await this.model.update({ inProgress: false }, { where: { id: idMatch } });
    if (matchUpdated[0] === 1) {
      return { message: 'Finished' };
    }
    return { message: 'ERROR' };
  }

  async updateMatch(idMatch: number, homeTeamGoals: number, awayTeamGoals: number):
  Promise<ServiceMessage> {
    const matchUpdated = await this.model
      .update({ homeTeamGoals, awayTeamGoals }, { where: { id: idMatch } });
    if (matchUpdated[0] === 1) {
      return { message: 'Updated' };
    }
    return { message: 'ERROR' };
  }

  async createMatch(match: IMatch): Promise<IMatch | ServiceMessage> {
    const { homeTeamId, awayTeamId } = match;
    const createMatchObj = { ...match, inProgress: true };
    if (homeTeamId === awayTeamId) {
      return { message: 'It is not possible to create a match with two equal teams' };
    }
    const findTeams = await this.model.findAll({ where: { id: [homeTeamId, awayTeamId] } });
    if (findTeams.length !== 2) {
      return { message: 'There is no team with such id!' };
    }
    const newMatch = await this.model.create(createMatchObj);
    return newMatch;
  }
}
