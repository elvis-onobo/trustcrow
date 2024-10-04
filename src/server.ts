import app from "./app";
import logger from "@/utils/logger";

const PORT: number = Number(process.env.PORT) || 3005;

const HOSTNAME: string = process.env.HOSTNAME as string;

app.listen(PORT, (): void => {
  logger.info(`listening on port:${PORT}`);
});
