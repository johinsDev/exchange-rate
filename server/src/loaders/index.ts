import expressLoader from "./express";
import Logger from "./logger";
import LoggerLoaded from "./IoC";
import mongooseLoader from "./moongose";
import CurrencyLoader from "./money";

export default async ({ expressApp }) => {
  await mongooseLoader();
  Logger.info("✌️ DB loaded and connected!");

  await LoggerLoaded();
  Logger.info("✌️ Logger loaded");

  await CurrencyLoader();
  Logger.info("✌️ Currency lib loaded");

  await expressLoader({ app: expressApp });

  Logger.info("✌️ Express loaded");
};
