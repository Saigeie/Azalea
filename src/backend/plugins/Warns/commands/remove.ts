import { Guild } from "discord.js";
import messageDelete from "../../../modules/messageDelete";
import { Command } from "../../../structures/Command";
import { DelWarn } from "../Functions";

export default new Command({
    name: `warn_remove`,
    description: `Remove a warning.`,
    errorMessages: ["Please supply a valid case id.","No warn was found. (\`#{id}\`)"],
    expectedArgs: ["!warn_remove <id>"],
    category: "warns",
    execute: async ({ ctx, command, formattedArgs, args }) => {
        if (!args[0]) return ctx.channel.send({ content: `**${command.expectedArgs[0]}**\n${command.errorMessages[0]}`})
        const delWarn = await DelWarn(args[0] as string, ctx.guild as Guild);
        if(!delWarn) { return ctx.channel.send({content: `**${command.expectedArgs[0]}**\n${command.errorMessages[1].replace("{id}", args[0] as string)}`})}
        ctx.channel.send({content: `Warning deleted. (**${ctx.guild.members.cache.find(m => m.id === delWarn.userId).user.tag}**) (\`#${args[0]}\`) `}).then((msg) => messageDelete(msg, 5000))
        return;
    }
})