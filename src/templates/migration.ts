import { DataTypes, QueryInterface } from "sequelize"
import { Migration } from '../migration'

const up: Migration = async ({context: queryInterface} : { context: QueryInterface}) => {
}

const down: Migration  = async ({context: queryInterface} : { context: QueryInterface}) => {
	
};

export { up, down }

