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
import connect from "../../Schemas/connect";
import { Event } from "./Event";
const globPromise = promisify(glob);

export default class Azalea extends Client {
  commands: Collection<string, CommandTypes> = new Collection();
  config: Config = { prefix: "!" };
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

  async registerModules() {
    connect();
    const commandFiles = await globPromise(
      `${__dirname}/../plugins/**/commands/*{.ts,.js}`
    );
    commandFiles.forEach(async (filePath) => {
      const command: CommandTypes = await this.importFile(filePath);
      if (!command.name) return;
      this.commands.set(command.name, command);
    });
    const eventFiles: string[] = []
    await (await globPromise(`${__dirname}/../events/**/*{.ts,.js}`)).forEach((file) => { eventFiles.push(file) })
    await (await globPromise(`${__dirname}/../plugins/**/events/*{.ts,.js}`)).forEach((file) => { eventFiles.push(file) })
    eventFiles.forEach(async (filePath) => {
      const event: Event<keyof ClientEvents> = await this.importFile(filePath);
      this.on(event.event, event.run);
    });
  }
}
