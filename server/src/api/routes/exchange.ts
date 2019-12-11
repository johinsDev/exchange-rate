import { Router, Request, Response } from "express";
import { Container } from "typedi";
import Currency, { CurrencyContract } from "../../lib/Currency";
import { celebrate, Joi, Segments } from "celebrate";

const route = Router();

export default (app: Router) => {
  app.use("/exchange", route);

  route.get(
    "/convert",
    async (req, res, next) => {
      const currency = Container.get("currency") as Currency;

      let currencies = await currency.disk().all();
      currencies = currencies.map(c => c.code.toLowerCase());

      return celebrate({
        [Segments.QUERY]: Joi.object({
          from: Joi.string()
            .required()
            .valid(...currencies),
          to: Joi.string()
            .required()
            .valid(...currencies),
          amount: Joi.number().required()
        })
      })(req, res, next);
    },
    async (req: Request, res: Response) => {
      const currency: CurrencyContract = Container.get("currency");
      const { from, to, amount } = req.query;

      return res
        .json({ exchange: await currency.convert(amount, from, to, true) })
        .status(200);
    }
  );
};
