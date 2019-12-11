import { EventSubscriber, On } from "event-dispatch";
import events from "./events";
import Logger from "../loaders/logger";

@EventSubscriber()
export default class UserSubscriber {
  @On(events.user.signIn)
  public onUserSignIn(data: { user: any }) {
    try {
      data.user.lastLogin = new Date();

      data.user.save();
    } catch (e) {
      Logger.error(`🔥 Error on event ${events.user.signIn}: %o`, e);

      // Throw the error so the process die (check src/app.ts)
      throw e;
    }
  }
}
