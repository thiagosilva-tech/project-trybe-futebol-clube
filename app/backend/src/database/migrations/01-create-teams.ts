import { DataTypes, Model, QueryInterface } from "sequelize";
import { ITeam } from "../../Interfaces/teams/ITeam";

export default {
    up(queryInterface: QueryInterface){
        return queryInterface.createTable<Model<ITeam>>('teams', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            teamName: {
                allowNull: false,
                type: DataTypes.STRING,
            }
        });
    },

    down(queryInterface: QueryInterface){
        return queryInterface.dropTable('teams')
    }
}