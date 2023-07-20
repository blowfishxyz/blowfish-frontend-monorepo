import express, { Express, Request, Response } from "express";
import cors from "cors";
import pino from "pino-http";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

import { blowfishProxyHandler } from "./routes/proxy";
import { healthHandler } from "./routes/health";

const port = process.env.PORT ?? "3000";

const app: Express = express();
app.use(pino());
// TODO(kimpers): properly validate that origin is "chrome-extension://our_extension_id"
app.use(cors());
app.use(bodyParser.json());

// Proxy all request paths starting with /proxy/api/* to Blowfish API
app.use(`/proxy/api/*`, blowfishProxyHandler);
app.use(`/healthz`, healthHandler);
app.use("*", (req: Request, res: Response) => {
  const { path } = req;
  req.log.warn({ path }, "Invalid path requested");
  res.send(404);
});

app.listen(port, () => {
  console.log(`Listening on the port ${port}`);
});
