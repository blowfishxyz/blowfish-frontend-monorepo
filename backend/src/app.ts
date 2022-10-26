import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import pino from "pino-http";

dotenv.config();

const port = process.env.PORT ?? "3000";

const app: Express = express();
app.use(pino());
app.use(cors());

app.get("/*", (req: Request, res: Response) => {
  const path = req.path;
  req.log.info(`Hello ${path}`);
  res.send(`Hello ${path}`);
});

app.listen(port);
