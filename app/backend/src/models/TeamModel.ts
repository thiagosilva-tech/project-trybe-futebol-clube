import SequelizeTeam from '../database/models/SequelizeTeam';
import { ITeam } from '../Interfaces/teams/ITeam';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  async findAll(): Promise<ITeam[]> {
    const teams = await this.model.findAll();
    return teams.map((team) => ({ id: team.dataValues.id, teamName: team.dataValues.teamName }));
  }

  async findById(id: ITeam['id']): Promise<ITeam | null> {
    const team = await this.model.findByPk(id);
    if (team == null) return null;

    const { teamName } = team.dataValues;
    return { id, teamName };
  }
}
