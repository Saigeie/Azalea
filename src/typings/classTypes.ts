/**
 * Developers - KeyCats ( JNSP, Saige, Kanna )
 * Repo: https://github.com/KeyCats/Ruby
 * Github: https://github.com/KeyCats/Ruby
 * 2022
 */

import {
  ChatInputApplicationCommandData,
  CommandInteraction,
  CommandInteractionOptionResolver,
  GuildMember,
  PermissionResolvable,
} from "discord.js";
import Ruby from "../structures/Client";

//? Commands

export interface Extendedinteraction extends CommandInteraction {
  member: GuildMember;
}

export interface CommandRunInterface {
  client: Ruby;
  ctx: Extendedinteraction;
  args: CommandInteractionOptionResolver;
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
} & ChatInputApplicationCommandData;
