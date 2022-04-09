import { stringFormat } from "../../../modules/formatters";
import { Command } from "../../../structures/Command";
import { Embed } from "../../../structures/Embed";
import getInfo from "../getInfo";

export default new Command({
  name: `case`,
  description: `See information on a singluar case.`,
  expectedArgs: ["!case <id>"],
  errorMessages: ["Please supply valid id.", "No case found. (`#{id}`)"],
  category: "Cases",
  execute: async ({ ctx, command, args, config }) => {
    if (!args[0])
      return ctx.channel.send({
        embeds: [
          new Embed({
            description: `*${command.errorMessages[0]}*\n\`${command.expectedArgs[0]}\`\n\nArguments:\n\`id\` typeof [**String**](${process.env.URL}/docs/type/String)`,
          }),
        ],
      });
    const userCase = await getInfo(args[0] as string, ctx.guild);
    if (!userCase) {
      return ctx.channel.send({
        embeds: [
          new Embed({
            description: `*${command.errorMessages[1].replace(
              "{id}",
              args[0] as string
            )}*\n\`${
              command.expectedArgs[0]
            }\`\n\nArguments:\n\`id\` typeof [**String**](${
              process.env.URL
            }/docs/type/String)`,
          }),
        ],
      });
    }
    const member = ctx.guild.members.cache.find(
      (m) => m.id === userCase.userId
    );
    const channel = ctx.guild.channels.cache.find(
      (c) => c.id === userCase.case.channelId
    );
    const moderator = ctx.guild.members.cache.find(
      (m) => m.id === userCase.case.moderatorId
    );
    ctx.channel.send({
      embeds: [
        new Embed({
          author: {
            name: `Case #${args[0]} (${member.user.tag})`,
            icon_url: member.user.displayAvatarURL({ dynamic: true }),
          },
          description: `**Type**: ${stringFormat(
            userCase.case.type
          )}\n**ID**: \`#${userCase.case.id}\`\n**Channel**: ${
            channel ? `<#${channel.id}>` : "Channel deleted."
          }\n**Moderator**: ${
            moderator
              ? `${moderator.user.tag} (\`${moderator.user.id}\`)`
              : "Mod flag not supplied."
          }\n**Date**: <t:${Math.floor(userCase.case.date / 1000)}:F>${
            userCase.case.time ? `\n**Length**: ${userCase.case.time}` : ""
          }\n\nYou can use \`${config.prefix}cases [member]\` to see all user cases.`,
        }),
      ],
    });
  },
});
