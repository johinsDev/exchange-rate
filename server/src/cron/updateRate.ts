import Container from "typedi";
import axios from "axios";
import Currency from "../lib/Currency";
import Config from "../lib/Config";

class UpdateRate {
  getSchedule() {
    return "*/10 * * * *";
  }

  handle() {
    const Currency = Container.get("currency") as Currency;

    const Config = Container.get("config") as Config;

    const { api, domain } = Config.get("app.exchange");

    axios.get(`${domain}?access_key=${api}&format=1`).then(res => {
      Currency.disk()
        .all()
        .then(currencies => {
          currencies.forEach(currency => {
            const newExchangeRate = res.data.rates[currency.code];

            if (newExchangeRate !== currency.exchangeRate) {
              Currency.disk().update(currency.code, {
                exchangeRate: newExchangeRate
              });
            }
          });
        });
    });
  }
}

export default UpdateRate;
