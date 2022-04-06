/**
 * Developer - Saige
 * Repo: https://github.com/Saigeie/Ruby
 * Github: https://github.com/Saigeie/
 * 2022
 */

import { ApplicationCommandDataResolvable } from "discord.js";

export interface RegisterCommandsOptions {
  guildId?: string;
  commands: ApplicationCommandDataResolvable[];
}
