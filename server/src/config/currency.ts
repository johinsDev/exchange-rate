import dotenv from "dotenv";

export default {
  default: "database",
  defaultCurrency: "EUR",
  disks: {
    database: {
      driver: "mongo"
    }
  }
};
