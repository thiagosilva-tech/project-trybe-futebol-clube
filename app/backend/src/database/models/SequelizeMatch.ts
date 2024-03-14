import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import db from '.';
import SequelizeTeam from './SequelizeTeam';

class SequelizeMatch extends Model<InferAttributes<SequelizeMatch>,
InferCreationAttributes<SequelizeMatch>> {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

SequelizeMatch.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  tableName: 'matches',
  modelName: 'Match',
  timestamps: false,
  underscored: true,
});

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });
SequelizeTeam.hasMany(SequelizeMatch, { foreignKey: 'home_team_id', as: 'homeMatches' });
SequelizeTeam.hasMany(SequelizeMatch, { foreignKey: 'away_team_id', as: 'awayMatches' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });
SequelizeMatch.belongsTo(SequelizeTeam, { foreignKey: 'home_team_id', as: 'homeTeam' });
SequelizeMatch.belongsTo(SequelizeTeam, { foreignKey: 'away_team_id', as: 'awayTeam' });
export default SequelizeMatch;
