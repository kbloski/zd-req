import dotenv from "dotenv";
dotenv.config();
import { authenticateDatabase } from "./utils/db.js";
import { syncDatabase } from "./models/schemas.js";

import express from "express";
import cors from "cors";
import { intervalUpdateServerDataAfterDay } from "./cron.js";
import basicAuthMiddleware from "./services/basicAuthMiddleware.js";
import routes from "./routes.js";

authenticateDatabase();
syncDatabase()
const app = express();

intervalUpdateServerDataAfterDay();
app.use(
    cors((origin, callback) => {
        return callback(null, true);
    })
);
app.use(basicAuthMiddleware);
app.use(routes);


export default app;
