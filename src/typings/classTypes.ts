/**
* Developer - Saige
* Repo: https://github.com/Saigeie/Ruby
* Github: https://github.com/Saigeie/
* 2022
*/

import {
  Message,
  PermissionResolvable,
} from "discord.js";

import Ruby from "../structures/Client";

//? Commands


export interface CommandRunInterface {
  client: Ruby;
  ctx: Message;
  args: String[];
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
  execute: CommandRun;
};
