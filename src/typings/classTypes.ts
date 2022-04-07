/**
 * Developer - Saige
 * Repo: https://github.com/Saigeie/Azalea
 * Github: https://github.com/Saigeie/
 * 2022
 */

import { Message, PermissionResolvable } from "discord.js";

import Azalea from "../backend/structures/Client";

//? Commands

export interface CommandRunInterface {
  client: Azalea;
  ctx: Message;
  args: String[];
  formattedArgs: Object
}

export type CommandRun = (options: CommandRunInterface) => any;

export type CommandTypes = {
  name: string;
  category: string;
  cooldown?: number;
  description: string;
  expectedArgs?: Array<string>;
  sandbox?: boolean;
  developer?: boolean;
  permissions?: PermissionResolvable[];
  aliases?: string[];
  execute: CommandRun;
};
