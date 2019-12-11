import { CurrencyManagerConfig, CurrencyManagerConfigDisk } from "./types";
import { DriverInterface } from "./Contracts/StoreDriverInterface";
import { MongoDriver, ICurrency } from "./StoreDrivers/Mongo";
import * as R from "ramda";
import number_format from "./utils";

export interface CurrencyContract {
  convert(amount: number, from: string, to: string, format?: boolean);
}

const Drivers = {
  mongo: MongoDriver
};

class Currency {
  private _config: CurrencyManagerConfig;

  private _disks: CurrencyManagerConfigDisk;

  private _disk: DriverInterface;

  constructor(config: CurrencyManagerConfig) {
    this._config = config;
    this._disks = config.disks || {};
    this._disk = this.disk();
  }

  disk<T extends DriverInterface>(name?: string, config?: unknown): T {
    name = name || this._config.default;

    /**
     * No name is defined and neither there
     * are any defaults.
     */
    if (!name) {
      throw Error("Not name defined");
    }

    const diskConfig = this._disks[name];

    /**
     * Configuration for the defined disk is missing
     */
    if (!diskConfig) {
      throw Error("Not config defined");
    }

    /**
     * There is no driver defined on disk configuration
     */
    if (!diskConfig.driver) {
      throw Error("There is no driver defined on disk configuration");
    }

    const Driver = Drivers[diskConfig.driver];

    /**
     * Unable to pull driver from the drivers list
     */
    if (!Driver) {
      throw Error("Unable to pull driver from the drivers list");
    }

    return new Driver(Object.assign(diskConfig, config));
  }

  async getProp(code: string, prop: string) {
    try {
      const currency = await this._disk.find(code.toUpperCase());

      return currency[prop];
    } catch (error) {
      throw error;
    }
  }

  public async format(
    amount: number,
    code: string = null,
    includeSymbol: boolean = true
  ) {
    // Get default currency if one is not set
    const $code = code || this._config.defaultCurrency;

    // Get the measurement format
    const format = await this.getProp($code, "format");

    // Match decimal and thousand separators
    const separators = format.match(/[\s\',.!]/g);

    let thousand = R.pathOr(null, [0], separators);

    if (thousand == "!") {
      thousand = "";
    }

    const decimal = R.pathOr(null, [1], separators);

    // Match format for decimals count
    let valFormat = format.match(/([0-9].*|)[0-9]/g);

    valFormat = R.pathOr("0", [0], valFormat);

    // Count decimals length
    const decimals = valFormat.substring(valFormat.indexOf(decimal) + 1).length;

    const negative = amount < 0 ? "-" : "";

    let value: number | string = `${amount}`;

    // Do we have a negative value?
    if (negative) {
      value = amount * -1;
    }

    // Format the value
    value = number_format(`${value}`, decimals, decimal, thousand);

    // Apply the formatted measurement
    if (includeSymbol) {
      value = format.replace(/([0-9].*|)[0-9]/g, value);
    }

    // Return value
    return `${negative}${value}`;
  }

  async convert(amount: number, from: string, to: string, format?: boolean) {
    try {
      const $from = from || this._config.defaultCurrency;

      const $to = to;

      const fromRate = await this.getProp($from, "exchangeRate");

      const toRate = await this.getProp($to, "exchangeRate");

      let value;

      // Skip invalid to currency rates
      if (toRate === null) {
        return null;
      }

      // Convert amount
      if (fromRate === toRate) {
        value = amount;
      } else {
        value = (amount * toRate) / fromRate;
      }

      // Should the result be formatted?
      if (format) {
        return this.format(value, $to);
      }

      // Return value
      return value;
    } catch (error) {}
  }
}

export default Currency;
