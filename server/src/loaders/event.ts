import { EventDispatcher as EventDispatcherClass } from "event-dispatch";

import Container from "typedi";

export default async function EventLoader() {
  const eventDispatcher = new EventDispatcherClass();
  Container.set("event", eventDispatcher);
}
