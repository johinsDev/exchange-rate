import expressLoader from "./express";
import Logger from "./logger";
import LoggerLoaded from "./IoC";

export default async ({ expressApp }) => {
  // const mongoConnection = await mongooseLoader();
  // Logger.info('✌️ DB loaded and connected!');

  // const userModel = {
  //   name: 'userModel',
  //   // Notice the require syntax and the '.default'
  //   model: require('../models/user').default,
  // };

  await LoggerLoaded();
  Logger.info("✌️ Logger loaded");

  await expressLoader({ app: expressApp });

  Logger.info("✌️ Express loaded");
};
