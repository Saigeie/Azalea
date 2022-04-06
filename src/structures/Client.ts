/**
 * Developers - KeyCats ( JNSP, Saige, Kanna )
 * Repo: https://github.com/KeyCats/Ruby
 * Github: https://github.com/KeyCats/Ruby
 * 2022
 */

import {
  ApplicationCommandDataResolvable,
  Client,
  ClientEvents,
  Collection,
} from "discord.js";
import { CommandTypes } from "../typings/classTypes";
import { Config } from "./Config";
import Logger from "../utils/Logger";
import glob from "glob";
import { promisify } from "util";
import chalk from "chalk";
import { RegisterCommandsOptions } from "../typings/clientTypes";
import connect from "../data/connect";
import { Event } from "./Event";
const globPromise = promisify(glob);

export default class Ruby extends Client {
  commands: Collection<string, CommandTypes> = new Collection();
  config: Config = {};
  logger = Logger;
  constructor() {
    super({ intents: 32767 });
  }
  start() {
    this.registerModules();
    this.login(process.env.DISCORD_TOKEN);
  }
  async importFile(filePath: string) {
    return (await import(filePath))?.default;
  }

  async registerCommands({ commands, guildId }: RegisterCommandsOptions) {
    if (guildId) {
      this.guilds.cache.get(guildId)?.commands.set(commands);
      this.logger.info(`${chalk.redBright(`Commands Registered:`)} ${guildId}`);
    } else {
      this.application?.commands.set(commands);
      this.logger.info(`${chalk.redBright(`Registering global commands`)}`);
    }
  }

  async registerModules() {
    connect();
    const slashCommands: ApplicationCommandDataResolvable[] = [];
    const commandFiles = await globPromise(
      `${__dirname}/../commands/**/*{.ts,.js}`
    );
    commandFiles.forEach(async (filePath) => {
      const command: CommandTypes = await this.importFile(filePath);
      if (!command.name) return;
      this.commands.set(command.name, command);
      slashCommands.push(command);
    });
    this.on("ready", () => {
      this.registerCommands({
        //guildId: `${process.env.GUILD_ID}`,
        commands: slashCommands,
      });
    });
    const eventFiles = await globPromise(
      `${__dirname}/../events/**/*{.ts,.js}`
    );
    eventFiles.forEach(async (filePath) => {
      const event: Event<keyof ClientEvents> = await this.importFile(filePath);
      this.on(event.event, event.run);
    });
  }
}
