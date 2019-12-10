import Currency from "../lib/Currency";
import Container from "typedi";
import { ConfigContract } from "../lib/Config";

export default async function CurrencyLoader() {
  const Config: ConfigContract = Container.get("config");
  Container.set("currency", new Currency(Config.get("currency")));
}
