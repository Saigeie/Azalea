import chalk from "chalk";
import { client } from "../../..";
import genNewAPIKey from "../../modules/genNewAPIKey";
import { Event } from "../../structures/Event";

export default new Event(`ready`, async () => {
    client.APIKey = await genNewAPIKey()
    client.logger.info(
      `Client (${chalk.redBright(`${client.user.tag}`)}) is now online!`
    );
})