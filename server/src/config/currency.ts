import dotenv from "dotenv";

export default {
  currencies: [
    {
      code: "EUR",
      format: "1.0,00 €",
      exchangeRate: 1,
      symbol: "€",
      name: "Euro"
    },
    {
      code: "USD",
      format: "$1,0.00",
      exchangeRate: 1.108992,
      symbol: "$",
      name: "US Dollar"
    },
    {
      code: "COP",
      format: "$ 1,0.00",
      exchangeRate: 3777.780255,
      name: "Colombian Peso",
      symbol: "$"
    }
  ],
  default: "database",
  defaultCurrency: "EUR",
  disks: {
    database: {
      driver: "mongo"
    }
  }
};
