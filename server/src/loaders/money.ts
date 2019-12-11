import Currency from "../lib/Currency";
import Container from "typedi";
import { ConfigContract } from "../lib/Config";

export default async function CurrencyLoader() {
  const Config: ConfigContract = Container.get("config");
  const instance = new Currency(Config.get("currency"));

  Config.get("currency.currencies", []).forEach(async currency => {
    if (!(await instance.disk().find(currency.code))) {
      instance.disk().create(currency);
    }
  });

  Container.set("currency", instance);
}
