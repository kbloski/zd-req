import express from "express";
import cors from 'cors';

import { registerRoutes } from "../routes/index.js";
const PORT = 8110;
const app = express();

app.use( express.urlencoded())
app.use( cors({
origin: (origin, callback) => {
    // zezwalam dla wszytskich źródeł
    callback(null, true)
    }
}))

registerRoutes( app)

app.listen(PORT, () => console.log("Serwer działa"));
