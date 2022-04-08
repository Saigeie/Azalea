/**
 * Developer - Saige
 * Repo: https://github.com/Saigeie/Azalea
 * Github: https://github.com/Saigeie/
 * 2022
 */

import {
  ApplicationCommandDataResolvable,
  Client,
  ClientEvents,
  Collection,
} from "discord.js";
import { CommandTypes } from "../../typings/classTypes";
import { Config } from "./Config";
import Logger from "../../utils/Logger";
import glob from "glob";
import { promisify } from "util";
import connect from "../../schemas/connect";
import { Event } from "./Event";
const globPromise = promisify(glob);

export const importFile = async (filePath: string) => {
  return (await import(filePath))?.default;
};
export default class Azalea extends Client {
  commands: Collection<string, CommandTypes> = new Collection();
  config: Config = {
    emojis: {
      reply: "<:reply:959830863661649951>",
      right_skip: "<:right_skip:959833675569168424>",
      left_skip: " <:left_skip:959833675560808498>",
      right_arrow: "<:right_arrow:959833675523063870>",
      left_arrow: "<:left_arrow:959833675296555029>",
    },
  };
  APIKey: string = "";
  logger = Logger;
  constructor() {
    super({ intents: 32767 });
  }
  start() {
    this.registerModules();
    this.login(process.env.DISCORD_TOKEN);
  }

  async registerModules() {
    connect();
    const commandFiles = await globPromise(
      `${__dirname}/../plugins/**/commands/*{.ts,.js}`
    );
    commandFiles.forEach(async (filePath) => {
      const command: CommandTypes = await importFile(filePath);
      if (!command.name) return;
      this.commands.set(command.name, command);
    });
    const eventFiles: string[] = [];
    await (
      await globPromise(`${__dirname}/../events/**/*{.ts,.js}`)
    ).forEach((file) => {
      eventFiles.push(file);
    });
    await (
      await globPromise(`${__dirname}/../plugins/**/events/*{.ts,.js}`)
    ).forEach((file) => {
      eventFiles.push(file);
    });
    eventFiles.forEach(async (filePath) => {
      const event: Event<keyof ClientEvents> = await importFile(filePath);
      this.on(event.event, event.run);
    });
  }
}
