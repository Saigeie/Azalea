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
      color: client.config.color,
      ...data,
    });
  }
}

