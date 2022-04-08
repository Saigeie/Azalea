/**
 * Developer - Saige
 * Repo: https://github.com/Saigeie/Azalea
 * Github: https://github.com/Saigeie/
 * 2022
 */

import { client } from "../../..";
import CaseSettings from "../../../schemas/Collections/Guilds/CaseSettings";
import GuildMain from "../../../schemas/Collections/Guilds/GuildMain";
import formatArgs from "../../modules/args";
import { Event } from "../../structures/Event";

export default new Event(`messageCreate`, async (message) => {
  if (message.author.bot || !message.guild) return;
  let guildData = await GuildMain.findOne({ guildId: message.guild.id });
  if (!guildData) await GuildMain.create({ guildId: message.guild.id });
  let caseSettings = await CaseSettings.findOne({
    guildId: message.guild.id,
  });
  if (!caseSettings) await CaseSettings.create({ guildId: message.guild.id });
  guildData = await GuildMain.findOne({ guildId: message.guild.id });
  if (!message.content.startsWith(guildData.prefix)) return;
  const [cmd, ...args]: string[] = message.content
    .slice(guildData.prefix.length)
    .trim()
    .split(/ +/g);
  const command =
    client.commands.find((c) => c.name === cmd.toLowerCase()) ||
    client.commands.find((c) => c.aliases?.includes(cmd.toLowerCase()));
  if (command) {
    const formattedArgs = await formatArgs(args.join(" "));
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
    await command.execute({
      client: client,
      ctx: message,
      args: args,
      formattedArgs: formattedArgs,
      command: command,
      config: guildData,
    });
  } else {
    // Custom Commands
  }
});

/*

      */
