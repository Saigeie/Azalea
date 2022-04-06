/**
* Developer - Saige
* Repo: https://github.com/Saigeie/Ruby
* Github: https://github.com/Saigeie/
* 2022
*/

import { ClientEvents } from "discord.js";

export class Event<Key extends keyof ClientEvents> {
  constructor(
    public event: Key,
    public run: (...args: ClientEvents[Key]) => any
  ) {}
}
