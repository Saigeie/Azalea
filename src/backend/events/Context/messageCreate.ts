/**
 * Developer - Saige
 * Repo: https://github.com/Saigeie/Azalea
 * Github: https://github.com/Saigeie/
 * 2022
 */

import { client } from "../../..";
import CaseSettings from "../../../schemas/Collections/Guilds/CaseSettings";
import GuildMain from "../../../schemas/Collections/Guilds/GuildMain";
import Main from "../../../schemas/Collections/Users/Main";
import formatArgs from "../../modules/args";
import { Event } from "../../structures/Event";
import cooldowns from "../../modules/cooldowns";

export default new Event(`messageCreate`, async (message) => {
  if (message.author.bot || !message.guild) return;
  let guildData = (await GuildMain.findOne({ guildId: message.guild.id })) || {
    guildId: message.guild.id,
    prefix: "!",
    blacklistedUsers: [],
  };
  let userData = await Main.findOne({ userId: message.author.id });
  if (!userData) await Main.create({ userId: message.author.id });
  if (!message.content.startsWith(guildData.prefix)) return;
  const [cmd, ...args]: string[] = message.content
    .slice(guildData.prefix.length)
    .trim()
    .split(/ +/g);
  const command =
    client.commands.find((c) => c.name === cmd.toLowerCase()) ||
    client.commands.find((c) => c.aliases?.includes(cmd.toLowerCase()));
  if (command) {
    const formattedArgs = await formatArgs(
      message.content.slice(guildData.prefix.length).trim()
    );
    const newErrorMessages: string[] = [];
    const newExpectedArgs: string[] = [];
    if (command.errorMessages) {
      command.errorMessages.forEach((msg) => {
        newErrorMessages.push(msg.replace("!", guildData.prefix));
      });
    }
    if (command.expectedArgs) {
      command.expectedArgs.forEach((msg) => {
        newExpectedArgs.push(msg.replace("!", guildData.prefix));
      });
    }
    command["expectedArgs"] = newExpectedArgs;
    command["errorMessages"] = newErrorMessages;

    let caseSettings = await CaseSettings.findOne({
      guildId: message.guild.id,
    });
    if (!caseSettings) await CaseSettings.create({ guildId: message.guild.id });

    if (!command.cooldown) {
      command["cooldown"] = 2 * 1000;
    }
    await cooldowns(command, message.author.id, message, {
      client: client,
      ctx: message,
      args: args as string[],
      formattedArgs: formattedArgs,
      command: command,
      config: guildData,
    });

    if (!guildData) await GuildMain.create({ guildId: message.guild.id });
  } else {
    // Custom Commands
  }
});

/*

      */
