import "express-async-errors";
import express, { Application } from "express";
import "dotenv/config";
import { errorMiddleware } from "./utils/globals/middleware/error.middleware";
import { categoryRouter } from "./routes"
import db from './config/db/index'

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");

db
const version = "/v1";
app.use(version, categoryRouter)
app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.json({ success: true, status: 200, message: 'OK' });
})

export default app;
