import SequelizeTeam from '../database/models/SequelizeTeam';

const IncludesMatches = {
  include: [
    {
      model: SequelizeTeam,
      as: 'homeTeam',
      attributes: ['teamName'],
    },
    {
      model: SequelizeTeam,
      as: 'awayTeam',
      attributes: ['teamName'],
    },
  ],
};

export default IncludesMatches;
