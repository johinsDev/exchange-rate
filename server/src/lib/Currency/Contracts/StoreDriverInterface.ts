import {
  ICurrencyInputDTO,
  ICurrencyInputUpdateDTO
} from "../StoreDrivers/Mongo";

export interface DriverInterface {
  create(params: ICurrencyInputDTO);
  all();
  find(code: string, active?: boolean);
  update(code: string, attributes: ICurrencyInputUpdateDTO);
  delete(code: string);
}
