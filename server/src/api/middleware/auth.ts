import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ConfigContract } from "../../lib/Config";
import Container from "typedi";
import httpStatus from "http-status";

const auth = async (
  req: Request & { user: any; token: string },
  res: Response,
  next: NextFunction
) => {
  const User: any = Container.get("UserModel");

  const Config: ConfigContract = Container.get("config");

  const token =
    req.header("Authorization") &&
    req.header("Authorization").replace("Bearer ", "");

  try {
    if (!token) {
      throw new Error("auhtorization header missing");
    }

    const data = jwt.verify(token, Config.get("app.jwtSecret"));

    const user = await User.findOne({ _id: data._id, "tokens.token": token });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    res
      .status(httpStatus.UNAUTHORIZED)
      .send({ error: "Not authorized to access this resource" });
  }
};

export default auth;
