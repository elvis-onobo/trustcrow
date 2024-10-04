import environments from "./setup";
import { IEnvironments } from "./interface.config";

const environment: string = process.env.ENVIRONMENT as unknown as string;

const env: IEnvironments = environments[environment];

export const config = {
  port: env.PORT,
  environment: env.ENVIRONMENT,
  dbHost: env.DB_HOST,
  dbPort: env.DB_PORT,
  dbUser: env.DB_USER,
  dbPassword: env.DB_PASSWORD,
  dbName: env.DB_NAME
};
