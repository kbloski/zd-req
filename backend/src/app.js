import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { intervalUpdateServerDataAfterDay } from "./cron.js";
import basicAuthMiddleware from "./services/basicAuthMiddleware.js";
import routes from "./routes.js";

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
