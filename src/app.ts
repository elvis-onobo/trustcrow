import "express-async-errors";
import express, { Application } from "express";
import "dotenv/config";
import { errorMiddleware } from "@utils/globals/middleware/error.middleware";
import { categoriesRouter } from "./routes"
import db from '@/config/db/index'

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");

db
const version = "/v1";
app.use(version, categoriesRouter)
app.use(errorMiddleware);

export default app;
