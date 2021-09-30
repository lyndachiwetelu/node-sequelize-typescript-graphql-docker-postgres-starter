import { DataTypes, QueryInterface } from "sequelize"
import { Migration } from '../migration'

const up: Migration = async ({context: queryInterface} : { context: QueryInterface}) => {
    await queryInterface.createTable('User', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: true
		},
        email: {
			type: DataTypes.STRING,
			allowNull: false,
            unique: true
		},
        password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false
		}
	});
}

const down: Migration  = async ({context: queryInterface} : { context: QueryInterface}) => {
	await queryInterface.dropTable('User');
};

export { up, down }


