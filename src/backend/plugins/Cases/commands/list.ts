import { Guild, GuildMember } from "discord.js";
import CaseSettings from "../../../../schemas/Collections/Guilds/CaseSettings";
import Cases, {
  IndividualCase,
} from "../../../../schemas/Collections/Users/Cases";
import getMember from "../../../modules/getMember";
import { Command } from "../../../structures/Command";
import { Embed } from "../../../structures/Embed";

export default new Command({
  name: `cases`,
  category: "Cases",
  description: `See a members cases`,
  expectedArgs: [`!cases <member>`],
  errorMessages: [
    `Please supply a valid member.`,
    `**<<member>>** has no cases.`,
  ],
  execute: async ({ ctx, formattedArgs, command, config }) => {
    const { member, id } = formattedArgs as { member: string; id: string };
    const mentionedMember = ((await getMember(member, ctx.guild as Guild)) ||
      ctx.mentions.members.first() ||
      ctx.guild.members.cache.find(
        (m) => m.id === ctx.author.id
      )) as GuildMember;
    if (!mentionedMember) {
      return ctx.channel.send({ content: command.errorMessages[0] });
    }
    if (!id) {
      const userCases = await Cases.findOne({
        guildId: ctx.guild.id,
        userId: mentionedMember.id,
      });
      if (!userCases || !userCases.cases || userCases.cases.length < 1) {
        return ctx.channel.send({
          content: `${command.errorMessages[1].replace(
            "<<member>>",
            `**${mentionedMember.user.tag}**`
          )}`,
        });
      }
      const caseSettings = await CaseSettings.findOne({
        guildId: ctx.guild.id,
      });
      const formattedCases: string[] = [];
      userCases.cases.forEach((value) => {
        formattedCases.push(
          `\`${value.type.toUpperCase()}\` \`#${value.id}\` <t:${Math.floor(
            value.date / 1000
          )}:F> ${
            caseSettings.dmOnCaseUse ? `__(User notified via dms)__` : ""
          }\n${value.reason}`
        );
      });

      ctx.channel.send({
        embeds: [
          new Embed({
            author: {
              name: `Cases for ${mentionedMember.user.tag}`,
              icon_url: mentionedMember.user.displayAvatarURL({
                dynamic: true,
              }),
            },
            description: `${formattedCases.join("\n")}\n\nUse \`${
              config.prefix
            }case <case id>\` to view more details about a case.`,
          }),
        ],
      });
    }
  },
});
