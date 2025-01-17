import { CronJob } from "cron";

const handler = async () => {
    console.log("Hello");
};

export const testCron = new CronJob("0 0 0 * * *", handler);
