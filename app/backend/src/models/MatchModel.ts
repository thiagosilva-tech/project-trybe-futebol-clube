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
  //   let matches;
  //   if (inProgress && inProgress === 'true') {
  //     matches = await this.model.findAll({ where: { inProgress: true }, include: IncludesMatches });
  //   } else if (inProgress && inProgress === 'false') {
  //     matches = await this.model
  //       .findAll({ where: { inProgress: false }, include: IncludesMatches });
  //   } else {
  //     matches = await this.model.findAll({ include: IncludesMatches });
  //   }
  //   return matches.map((match) => formatMatch(match));
  }
}
