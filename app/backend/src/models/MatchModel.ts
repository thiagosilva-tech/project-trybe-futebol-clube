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
}
