import * as R from "ramda";

export interface ConfigContract {
  get(key: string, defaultValue?: any): any;
  merge(key: string, defaultValues: object): any;
  set(key: string, value: any): void;
}

export default class Config implements ConfigContract {
  constructor(private _config = {}) {}

  public get(key: string, defaultValue?: any): any {
    return R.pathOr(defaultValue, key.split("."), this._config);
  }

  public merge(key: string, defaultValues: object): any {
    return R.merge(this.get(key), defaultValues);
  }

  public set(key: string, value: any): void {
    this._config = R.set(R.lensPath(key.split(".")), value, this._config);
  }
}
