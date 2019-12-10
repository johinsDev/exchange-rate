import mongoose from "mongoose";
import { Db } from "mongodb";
import { Container } from "typedi";
import { ConfigContract } from "../lib/Config";

export default async (): Promise<Db> => {
  const Config: ConfigContract = Container.get("config");
  const connection = await mongoose.connect(Config.get("database.url"), {
    useNewUrlParser: true,
    useCreateIndex: true
  });
  return connection.connection.db;
};
