import { Schema } from "joi";
import { NextFunction, Request, Response } from "express";
import logger from "./logger";
import * as response from "./response";

export const validateBody = (schema: Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      await schema.validateAsync(body);
      next();
    } catch (error) {
      logger.error(`validateBody -- ${error}`);
      response.error(res, (error as Error).message, 400);
    }
  };
};

export const validateQueryParam = (schema: Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query;
      await schema.validateAsync(query);
      next();
    } catch (error) {
      logger.error(`validateQueryParam -- ${error}`);
      response.error(res, (error as Error).message, 400);
    }
  };
};

export const validateRouteParam = (schema: Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const params = req.params;
      await schema.validateAsync(params);
      next();
    } catch (error) {
      logger.error(`validateRouteParam -- ${error}`);
      response.error(res, (error as Error).message, 400);
    }
  };
};
