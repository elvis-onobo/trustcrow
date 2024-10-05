import { config } from '../index';
import pgp, { IMain } from 'pg-promise';
import promise from "bluebird";
import logger from '../../utils/logger';
import { DatabaseConfig } from './interface.db'
import * as environments from "../../utils/globals/enums/environments.enum"
class Database {
    private host: string;
    private port: number;
    private database: string;
    private user: string;
    private password: string;
    private db: any;

    constructor({ host, port, database, user, password }: DatabaseConfig) {
        if (![host, port, database, user, password].every(value => value != null)) {
            throw new Error('All database connection parameters must be provided.');
        }
        this.host = host;
        this.port = port;
        this.database = database;
        this.user = user;
        this.password = password;
        this.db = null;
    }

    public connect() {
        const pg = pgp({ promiseLib: promise, noWarnings: false });
        const initOptions = {
            host: this.host,
            user: this.user,
            port: this.port,
            password: this.password,
            database: this.database,
        }
        const client = pg(initOptions);

        client.connect().then(instance => {
            logger.info(`Connected to database: ${instance.client.database}`);
        }).catch(err => (config.environment != environments.TEST) ? logger.error(err): console.log(err))
        return client;
    }
}

const instance = new Database({ host: config.dbHost, port: config.dbPort, database: config.dbName, user: config.dbUser, password: config.dbPassword });
const db = instance.connect()

export default db
