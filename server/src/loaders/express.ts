import express from "express";
import bodyParser from "body-parser";
import routes from "../api";
import cors from "cors";
import Container from "typedi";
import { ConfigContract } from "../lib/Config";

export default ({ app }: { app: express.Application }) => {
  const Config: ConfigContract = Container.get("config");

  /**
   * Health Check endpoints
   */
  app.get("/status", (req, res) => {
    res.status(200).json({ status: "ONLINE" });
  });
  app.head("/status", (req, res) => {
    res.status(200).end();
  });

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable("trust proxy");

  app.use(cors());

  app.use(require("method-override")());

  app.use(bodyParser.json());

  app.use(Config.get("app.api.prefix"), routes());

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error("Not Found");
    err["status"] = 404;
    next(err);
  });

  /// error handlers
  app.use((err, req, res, next) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === "UnauthorizedError") {
      return res
        .status(err.status)
        .send({ message: err.message })
        .end();
    }
    return next(err);
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message
      }
    });
  });
};
