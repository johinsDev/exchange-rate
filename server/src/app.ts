import "reflect-metadata";

import express from "express";

import Logger from "./loaders/logger";
import ConfigLoader from "./loaders/config";
import Container from "typedi";
import { ConfigContract } from "./lib/Config";

async function startServer() {
  const app = express();

  await ConfigLoader();

  const Config: ConfigContract = Container.get("config");

  Logger.info("✌️ Config loaded");

  await require("./loaders").default({ expressApp: app });

  app.listen(Config.get("app.port"), err => {
    if (err) {
      Logger.error(err);
      process.exit(1);
      return;
    }
    Logger.info(`
      ################################################
      🛡️  Server listening on port: ${Config.get("app.port")} 🛡️
      ################################################
    `);
  });
}

startServer();
