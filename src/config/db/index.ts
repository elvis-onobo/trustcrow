import { config } from '../index';
import pgPromise, { IMain } from 'pg-promise';
import logger from '@/utils/logger';
import { DatabaseConfig } from './interface.db'

class Database {
    private host: string;
    private port: number;
    private database: string;
    private user: string;
    private password: string;
    private db: any;

    constructor({ host, port, database, user, password }: DatabaseConfig) {
        if (![host, port, database, user, password].every(v => v != null)) {
            throw new Error('All database connection parameters must be provided.');
        }
        this.host = host;
        this.port = port;
        this.database = database;
        this.user = user;
        this.password = password;
        this.db = null;
    }

    private async setup() {
        const connectParams = {
            host: this.host,
            port: this.port,
            database: this.database,
            user: this.user,
            password: this.password
        };
        const pgp: IMain = pgPromise();
        const dbInstance = pgp(connectParams);
        return dbInstance
    }
    
    public async connect() {
        if (!this.db) {
            this.db = await this.setup();
        }
        logger.info(`Connected to database ${this.database}`);
        return this.db;
    }
}

const db = new Database({ host: config.dbHost, port: config.dbPort, database: config.dbName, user: config.dbUser, password: config.dbPassword });
export default db.connect();
