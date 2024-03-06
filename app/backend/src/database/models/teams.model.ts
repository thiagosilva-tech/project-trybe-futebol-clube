import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';
import db from '.';
import { Teams } from '../../types/Teams';

export type TeamsInputtableFields = Optional<Teams, 'id'>;

type TeamsSequelizeModelCreator = ModelDefined<Teams, TeamsInputtableFields>;

export type TeamsSequelizeModel = Model<Teams, TeamsInputtableFields>;

const TeamsModel: TeamsSequelizeModelCreator = db.define('Teams', {
  teamName: DataTypes.STRING,
}, {
  tableName: 'teams',
  timestamps: false,
  underscored: true,
});

export default TeamsModel;
