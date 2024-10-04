import environments from "./setup";
import { IEnvironments } from "./interface.config";

const environment: string = process.env.ENVIRONMENT as unknown as string;

const env: IEnvironments = environments[environment];

export const config = {
  port: env.PORT,
  environment: env.ENVIRONMENT,
  dbUrl: env.DB_URL
};
