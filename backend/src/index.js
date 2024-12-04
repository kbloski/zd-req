import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
const PORT = process.env.APP_PORT ?? 8080;

app.listen(PORT, () => console.log("Server has been started at port " + PORT));
