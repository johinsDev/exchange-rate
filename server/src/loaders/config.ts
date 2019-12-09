import Container from "typedi";
import Config from "../lib/Config";
import { requireAll } from "../utils/requireAll";

const configPath = `${__dirname}/../config`;

export default async function ConfigLoader() {
  Container.set("config", new Config(requireAll(configPath)));
}
