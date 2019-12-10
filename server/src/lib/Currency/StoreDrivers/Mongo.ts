import mongoose from "mongoose";
import { DriverInterface } from "../Contracts/StoreDriverInterface";
import { CurrencyManagerConfig } from "../types";

export interface ICurrency {
  _id: string;
  name: string;
  code: string;
  symbol: string;
  format: string;
  exchangeRate: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICurrencyInputDTO {
  name: string;
  code: string;
  symbol: string;
  format: string;
  exchangeRate: number;
  active?: boolean;
}

export interface ICurrencyInputUpdateDTO {
  name?: string;
  code?: string;
  symbol?: string;
  format?: string;
  exchangeRate?: number;
  active?: boolean;
}

const CurrencySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a full name"]
    },

    code: {
      type: String,
      uppercase: true,
      unique: true,
      index: true,
      required: true
    },

    symbol: {
      type: String,
      required: true
    },

    format: {
      type: String,
      required: true
    },

    exchangeRate: {
      type: Number,
      default: 0,
      required: true
    },

    active: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

const Currency = mongoose.model<ICurrency & mongoose.Document>(
  "Currency",
  CurrencySchema
);

export class MongoDriver implements DriverInterface {
  protected $config: CurrencyManagerConfig;

  constructor(config: CurrencyManagerConfig) {
    this.$config = config;
  }

  async create(params) {
    try {
      return await Currency.create(params);
    } catch (error) {
      throw new Error(error);
    }
  }

  async all() {
    try {
      return await Currency.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  async find(code: string) {
    try {
      return await Currency.findOne({ code });
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(code: string, params: ICurrencyInputDTO) {
    try {
      return await Currency.findOneAndUpdate({ code }, params);
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(code: string) {
    try {
      return await Currency.findOneAndDelete({ code });
    } catch (error) {
      throw new Error(error);
    }
  }
}
