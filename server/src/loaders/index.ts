import expressLoader from "./express";
import Logger from "./logger";
import LoggerLoaded from "./IoC";
import mongooseLoader from "./moongose";
import CurrencyLoader from "./money";
import user from "../models/user";
import Container from "typedi";
import EventLoader from "./event";
import history from "../models/history";
import "../subscribers/user";

const Models = {
  user,
  history
};

export default async ({ expressApp }) => {
  await mongooseLoader();
  Logger.info("✌️ DB loaded and connected!");

  await EventLoader();
  Logger.info("✌️ events loaded");

  await LoggerLoaded();
  Logger.info("✌️ Logger loaded");

  Object.keys(Models).forEach(modelName => {
    const name = `${modelName.charAt(0).toUpperCase()}${modelName.slice(
      1
    )}Model`;
    Container.set(name, Models[modelName]);
    Logger.info(
      "*********************** MODELS LOADER **************************"
    );
    Logger.info(`                 ✌️  Model ${name} loaded`);
    Logger.info(
      "****************************************************************"
    );
  });

  await CurrencyLoader();
  Logger.info("✌️ Currency lib loaded");

  await expressLoader({ app: expressApp });

  Logger.info("✌️ Express loaded");
};
