import chalk from "chalk";
import { WebhookClient, WebhookClientData } from "discord.js";
import { client } from "../..";

const sendError = async (type: "apikey" | "bot" | "node", message: string) => {
    let webhookData: WebhookClientData;
    if (type === "apikey") webhookData = {
      token: process.env.ERROR_WEBHOOK_TOKEN,
      id: process.env.ERROR_WEBHOOK_ID,
    };

    const webhook = new WebhookClient(webhookData);
    if (!webhook) return client.logger.error(`Failed to grab webhook of type: "${chalk.redBright(type)}"`)
    webhook.send({
      content: `Time: <t:${Math.floor(Date.now() / 1000)}:F> | Type: ${type}\n\n${message}`,
    });
}

export default sendError;