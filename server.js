import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import https from "https";
import { Log } from "./tools/logger.js";

import userRoutes from "./routes/v1/userRoutes.js";
import authRoutes from "./routes/v1/authRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/v1/user", userRoutes);
app.use("/v1/auth", authRoutes);

// ... if our route isn't found
app.use("/", (req, res) => {
    Log.warn(
        "routes",
        "Cannot find route: " + req.method + " " + req.path,
        "",
        req.ip
    );
    res.status(404).json({ error: "error:notFound" });
});

const httpPort = process.env.HTTP_PORT || 80;
const httpsPort = process.env.HTTPS_PORT || 443;

const httpServer = http.createServer(app);
const httpsServer = https.createServer(app);

httpServer.listen(httpPort, async () => {
    await Log.general(
        "start",
        "startup",
        `HTTP server listening on port ${httpPort}`
    );
});

httpsServer.listen(httpsPort, async () => {
    await Log.general(
        "start",
        "startup",
        `HTTPS server listening on port ${httpsPort}`
    );
});
