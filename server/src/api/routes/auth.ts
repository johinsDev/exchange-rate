import { Router, Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import { IUserInputDTO, IUser } from "../../models/user";
import HTTPStatus from "http-status";
import auth from "../middleware/auth";
import events from "../../subscribers/events";
import { EventDispatcher as EventDispatcherInterface } from "event-dispatch";
import { celebrate, Joi } from "celebrate";

const route = Router();

export default (app: Router) => {
  app.use("/auth", route);

  route.post(
    "/signup",
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required()
      })
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const UserModel: any = Container.get("UserModel");

      const data = req.body as IUserInputDTO;

      try {
        const user = await UserModel.create({
          ...data
        });

        const token = await user.generateAuthToken();

        return res.json({ user, token }).status(HTTPStatus.CREATED);
      } catch (error) {
        error.status = HTTPStatus.BAD_REQUEST;

        next(error);
      }
    }
  );

  route.post(
    "/signin",
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
      })
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const User: any = Container.get("UserModel");

      try {
        const { email, password } = req.body;

        const user = await User.findByCredentials(email, password);

        const token = await user.generateAuthToken();

        const eventDispacher = Container.get(
          "event"
        ) as EventDispatcherInterface;

        eventDispacher.dispatch(events.user.signIn, { user });

        res.send({ user, token });
      } catch (error) {
        error.status = HTTPStatus.UNAUTHORIZED;

        next(error);
      }
    }
  );

  route.post(
    "/logout",
    auth,
    async (
      req: Request & { user: IUser & any; token: string },
      res: Response,
      next: NextFunction
    ) => {
      // Log user out of the application
      try {
        req.user.tokens = req.user.tokens.filter(token => {
          return token.token != req.token;
        });

        await req.user.save();
        res.send();
      } catch (error) {
        error.status = HTTPStatus.INTERNAL_SERVER_ERROR;
        next(error);
      }
    }
  );

  route.post(
    "/logoutall",
    auth,
    async (
      req: Request & { user: IUser & any; token: string },
      res: Response,
      next: NextFunction
    ) => {
      // Log user out of all devices
      try {
        req.user.tokens.splice(0, req.user.tokens.length);

        await req.user.save();
        res.send();
      } catch (error) {
        error.status = HTTPStatus.INTERNAL_SERVER_ERROR;
        next(error);
      }
    }
  );

  route.get(
    "/me",
    auth,
    async (req: Request & { user: IUser }, res: Response) => {
      res.send(req.user);
    }
  );
};
