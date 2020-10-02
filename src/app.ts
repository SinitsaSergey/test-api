import * as express from "express";
import * as bodyParser from "body-parser";
import * as errorHandler from "strong-error-handler";
import {session} from "./routes/session";
import {round} from "./routes/round";
import {statistics} from "./routes/statistics";

export const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: "1mb"}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Expose-Headers", "x-total-count");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type,authorization");
  next();
});

app.use("/session", session);
app.use("/round", round);
app.use("/statistics", statistics);

app.use(errorHandler({
  debug: process.env.ENV !== "prod",
  log: true,
}));
