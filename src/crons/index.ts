import { notifyOldVisitors } from "./notify-old-visitors.cron";
import { removeOldPasswords } from "./remove-old-passwords.cron";
import { removeOldTokens } from "./remove-old-tokens.cron";

export const cronRunner = async () => {
    removeOldTokens.start();
    removeOldPasswords.start();
    notifyOldVisitors.start();
};