/**
 * Developer - Saige
 * Repo: https://github.com/Saigeie/Azalea
 * Github: https://github.com/Saigeie/
 * 2022
 */

import { Message, PermissionResolvable } from "discord.js";
import { Request, Response } from "express";

import Azalea from "../backend/structures/Client";
import { Guild } from "../schemas/Collections/Guilds/GuildMain";

//? Commands

export interface CommandInterface {
  name: string;
  category: string;
  cooldown?: number;
  description: string;
  expectedArgs?: Array<string>;
  sandbox?: boolean;
  developer?: boolean;
  permissions?: PermissionResolvable[];
  aliases?: string[];
  errorMessages?: string[];
}
export interface CommandRunInterface {
  client: Azalea;
  ctx: Message;
  args: String[];
  formattedArgs: Object
  command: CommandInterface
  config: Guild;
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
  errorMessages?: string[];
  execute: CommandRun;
};

//? Routes

export interface RunInterface {
  client: Azalea;
}

export type RouteRun = (req: Request, res: Response, options: RunInterface) => any;

export type APIRouteTypes = {
  name: string;
  middleware?: any[];
  execute: RouteRun;
}