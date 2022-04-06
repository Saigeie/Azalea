/**
* Developers - KeyCats ( JNSP, Saige, Kanna )
* Repo: https://github.com/KeyCats/Ruby
* Github: https://github.com/KeyCats/Ruby
* 2022
*/

import { ApplicationCommandDataResolvable } from "discord.js";

export interface RegisterCommandsOptions {
  guildId?: string;
  commands: ApplicationCommandDataResolvable[];
}