import nodeCron from "node-cron";
import { requireAll } from "../utils/requireAll";
import { esmRequire } from "../utils/esmRequire";

const cronPath = `${__dirname}/../cron`;

export default async function cronLoader() {
  const files = requireAll(cronPath);

  Object.keys(files).map(cron => {
    const provider = new files[cron]();

    nodeCron.schedule(provider.getSchedule(), provider.handle);
  });
}
