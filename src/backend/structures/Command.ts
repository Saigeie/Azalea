/**
 * Developer - Saige
 * Repo: https://github.com/Saigeie/Azalea
 * Github: https://github.com/Saigeie/
 * 2022
 */

import { CommandTypes } from "../../typings/classTypes";

export class Command {
  constructor(options: CommandTypes) {
    Object.assign(this, options);
  }
}
