import { Router } from "express";
import auth from "./routes/auth";
import exchange from "./routes/exchange";

export default () => {
  const app = Router();

  auth(app);

  exchange(app);

  return app;
};
