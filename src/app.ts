import "express-async-errors";
import path, { dirname, join } from "path";
import express, { Application } from "express";
import "dotenv/config";
import { errorMiddleware } from "@utils/globals/middleware/error.middleware";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");


const version = "/v1";


app.use(errorMiddleware);

export default app;
