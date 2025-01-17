import { removeOldTokens } from "./remove-old-tokens.cron"
import {removeOldPasswords} from "./remove-old-passwords.cron";


export const cronRunner = async () => {
    removeOldTokens.start()
    removeOldPasswords.start()
}