import { Guild, GuildMember } from "discord.js";
import { IndividualCase } from "../../../../schemas/Collections/Users/Cases";
import { makeId } from "../../../modules/caseIds";
import getMember from "../../../modules/getMember";
import { Command } from "../../../structures/Command";
import { AddWarn, Response, TestWarns } from "../Functions";
import messageDelete from "../../../modules/messageDelete";
import { Embed } from "../../../structures/Embed";
export default new Command({
  name: `warn_add`,
  description: `Add a warn to a user.`,
  expectedArgs: [
    `!warn_add <member> [--reason=<string>] [--mod | -m] [--invis | -i]`,
  ],
  category: `warns`,
  errorMessages: ["Please supply a valid member."],
  permissions: ["MANAGE_MESSAGES"],
  execute: async ({ ctx, command, formattedArgs, args }) => {
    const { reason, mod, m, invis, i } = formattedArgs as {
      reason: string;
      mod: boolean;
      m: boolean;
      invis: boolean;
      i: boolean;
    };
    let suppliedReason: string = reason
      ? reason.length > 1024
        ? reason.slice(0, 1021) + "..."
        : reason
      : "No reason supplied";
    let mentionedMember: GuildMember =
      (await getMember(args[0] as string, ctx.guild as Guild)) ||
      ctx.mentions.members.first();
    if (!mentionedMember) {
      return ctx.channel.send({
        embeds: [
          new Embed({
            description: `*${command.errorMessages[0]}*\n\`${command.expectedArgs[0]}\`\n\nArguments:\n\`member\`: typeof [**User**](${process.env.URL}/docs/types/User)\n\`--reason\`: typeof [**String**](${process.env.URL}/docs/types/String)\n\`--mod\`: typeof [**Boolean**](${process.env.URL}/docs/types/Boolean) (returns true, if supplied)\n\`--invis\`: typeof [**Boolean**](${process.env.URL}/docs/types/Boolean) (returns true, if supplied)`,
          }),
        ],
      });
    }
    ctx.delete().catch(() => {});
    const obj: IndividualCase = {
      reason: suppliedReason,
      type: "warn",
      channelId: ctx.channel.id,
      date: Date.now(),
      id: `${await makeId(mentionedMember.id, ctx.guild.id)}`,
    };
    if (mod || m) {
      obj["moderatorId"] = ctx.author.id;
    }
    const warning = (await AddWarn(
      obj,
      mentionedMember.id,
      ctx.guild.id
    )) as Response;
    if (invis || i) {
      return;
    }
    const msg = await ctx.channel.send({
      embeds: [new Embed({ description: `${warning.msg}` })],
    });
    messageDelete(msg, 5000);
    if(warning.error !== undefined) { ctx.channel.send({content: `${warning.error}`}).then((msg) => messageDelete(msg, 5000))}
    TestWarns(mentionedMember.user.id, ctx.guild as Guild);
    return;
  },
});
