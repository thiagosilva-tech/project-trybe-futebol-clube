import TeamsModel, { TeamsSequelizeModel } from '../database/models/teams.model';
import { ServiceResponse } from '../types/ServiceResponse';

async function getAll(): Promise<ServiceResponse<TeamsSequelizeModel[]>> {
  const teams = await TeamsModel.findAll();

  return { status: 'successful', data: teams };
}

export default { getAll };
