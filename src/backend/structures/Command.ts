/**
 * Developer - Saige
 * Repo: https://github.com/Saigeie/Azalea
 * Github: https://github.com/Saigeie/
 * 2022
 */

import { CommandRun, CommandTypes } from "../../typings/classTypes";
import Azalea from "./Client";
import { Message } from "discord.js";
export class Command {
  constructor(options: CommandTypes) {
    Object.assign(this, options);
  }
}
