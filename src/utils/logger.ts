import { format, createLogger, transports } from "winston";
import {config} from '../config/index'

const { combine, timestamp, errors, json, colorize, printf } = format;

const environment = config.environment;
const logger = () => {
  let consoleFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp}, ${level}, ${stack || message}`;
  });

  let fileFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp}, ${level}, ${message}`;
  });

  if (environment === "development" || environment === "test") {
    return createLogger({
      format: combine(
        colorize({ all: true }),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        fileFormat,
        errors({ stack: true })
      ),
      transports: [
        new transports.Console({ level: "info", format: consoleFormat }),
        new transports.Console({ level: "error", format: consoleFormat }),
        new transports.File({
          filename: "error.development.log",
          level: "error",
          format: fileFormat,
        }),
      ],
    });
  } else {
    return createLogger({
      format: combine(timestamp(), json(), fileFormat),
      transports: [
        new transports.Console({ level: "info", format: consoleFormat }),
        new transports.Console({ level: "error", format: consoleFormat }),
        new transports.File({
          filename: "error.production.log",
          level: "error",
          format: fileFormat,
        }),
      ],
    });
  }
};

export default logger();