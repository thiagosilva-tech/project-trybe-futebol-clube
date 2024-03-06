import { DataTypes, Model, QueryInterface } from "sequelize";
import { Teams } from "../../types/Teams";

export default {
    up(queryInterface: QueryInterface){
        return queryInterface.createTable<Model<Teams>>('teams', {
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