import * as R from "ramda";

export interface ConfigContract {
  get(key: string, defaultValue?: any): any;
  // merge(key: string, defaultValues: object, customizer?: Function): any;
  // set(key: string, value: any): void;
  // defaults(key: string, value: any): void;
}

export default class Config implements ConfigContract {
  constructor(private _config = {}) {}

  public get(key: string, defaultValue?: any): any {
    return R.pathOr(defaultValue, key.split("."), this._config);
  }
}
