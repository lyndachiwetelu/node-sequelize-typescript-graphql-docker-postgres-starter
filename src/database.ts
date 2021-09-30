import { Sequelize } from 'sequelize-typescript'
import pg from 'pg';
import sequelizeConfig from './config/config'
import dotenv from 'dotenv'
dotenv.config()

const activeConfig = sequelizeConfig[process.env.NODE_ENV || 'development']

export const sequelize = new Sequelize({
  port: parseInt(process.env.DB_PORT) || 5432,
  database: activeConfig.database,
  dialect: activeConfig.dialect,
  username: activeConfig.username,
  password: activeConfig.password,
  host: activeConfig.host,
  models: [__dirname + '/models']
})

export const initDBConnection = () => {
    return new Promise((resolve, reject) => {
        sequelize.authenticate().then(() => {
            console.log('Connected to database');
            resolve(sequelize);
           
        }).catch(err => {
            console.log('Error connecting to database');
            reject(err);
        });
    });
}

const config = {
    user: activeConfig.username,
    database: 'postgres',
    password: activeConfig.password,
    host: activeConfig.host,
};

export const initDB = () => {
    return new Promise(async (resolve, reject) => {
        console.log('Initializing DB');
        const pool = new pg.Pool(config)
        const client = await pool.connect()
        try {
            const query = await client.query(`CREATE DATABASE ${activeConfig.database};`)
            console.log('Database created successfully');
            await initDBConnection()
        } catch (err) {
            // do not reject if database already exists
            await initDBConnection()
            resolve(true)
        }
        client.release()
        resolve(true)
    });
}
