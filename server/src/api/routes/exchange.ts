import { Router, Request, Response } from "express";
import { Container } from "typedi";
import { Logger } from "winston";
import { CurrencyContract } from "../../lib/Currency";

const route = Router();

export default (app: Router) => {
  app.use("/exchange", route);

  route.get("/convert", async (req: Request, res: Response) => {
    const currency: CurrencyContract = Container.get("currency");
    const { from, to, amount } = req.query;
    // VALIDATE WITH CELEBRATE
    // DEPLOY WITH NODE AND MONGO ATLAS
    // AUTH
    // HISTORY
    // UPDATE EXHANGE AND ADD EXHANGE SIMPLE APP
    // ADD LINTERS
    return res
      .json({ exchange: await currency.convert(amount, from, to, true) })
      .status(200);
  });
};
