import {
  GuildMember,
  MessageEmbed,
  MessageEmbedOptions,
} from "discord.js";
import { client } from "../..";

export class Embed {
  constructor(
    data?: MessageEmbedOptions,
  ) {
    return new MessageEmbed({
      color: "NOT_QUITE_BLACK",
      ...data,
    });
  }
}

