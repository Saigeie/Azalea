import { Guild, GuildMember } from "discord.js";
import { IndividualCase } from "../../../../schemas/Collections/Users/Cases";
import { makeId } from "../../../modules/caseIds";
import getMember from "../../../modules/getMember";
import { Command } from "../../../structures/Command";
import { AddWarn, Response } from "../../../modules/Addons/Warns"
import messageDelete from "../../../modules/messageDelete";
export default new Command({
  name: `warn`,
    description: `Add a warn to a user.`,
    expectedArgs: [`!warn <member> [--reason=<string>] [--mod | -m] [--invis | -i]`],
    category: `warns`,
    errorMessages: ["Please supply a valid member."],
  permissions: ["MANAGE_MESSAGES"],
  execute: async ({ ctx, command, formattedArgs, args }) => {
        const { reason, mod, m, invis, i } = formattedArgs as { reason: string; mod: boolean; m: boolean; invis: boolean, i: boolean };
        let suppliedReason: string = reason ? reason.length > 1024 ? reason.slice(0, 1021) + "..." : reason : "No reason supplyed";
        let mentionedMember: GuildMember = await getMember(args[0] as string, ctx.guild as Guild) || ctx.mentions.members.first();
    if (!mentionedMember) { return ctx.channel.send({ content: `**${command.expectedArgs[0]}**\n*${command.errorMessages[0]}*` }) };
        ctx.delete().catch(() => {});
        const obj: IndividualCase = {
          reason: suppliedReason,
          type: "warn",
          channelId: ctx.channel.id,
          date: Date.now(),
          id: `${await makeId(mentionedMember.id, ctx.guild.id)}`,
        };
        if (mod || m) { obj["moderatorId"] = ctx.member.id };
        const warning = await AddWarn(obj, mentionedMember.id, ctx.guild.id) as Response
        if (invis || i) { return; }
        const msg = await ctx.channel.send({ content: `${warning.msg}` })
        messageDelete(msg, 5000)
        return;
    }
})