import { EmbedFieldData } from "discord.js";
import { permFormat, stringFormat } from "../../../modules/formatters";
import { Command } from "../../../structures/Command";
import { Embed } from "../../../structures/Embed";

export const CommandEmojis = {
    tags: `🏷`,
    warns: `🔨`,
    cases: `📜`,
    misc: `🚀`
}

export default new Command({
    name: `help`,
    description: `See azalea's commands/help panel.`,
    category: "misc",
    errorMessages: ["Missing required argument."],
    expectedArgs: ["!help <command>"],
    execute: async ({ ctx, client, args, config, command }) => {
        if (!args || args.length < 1) {
            return ctx.channel.send({embeds: [new Embed({ description: `**${command.errorMessages[0]}**\n\`${command.expectedArgs[0]}\`\n\nArguments:\n\`command\`: typeof [**String**](${process.env.URL}/docs/type/String)\n\n`, fields: [{name: `Commands`, value: `${client.commands.map((cmd) => `\`${cmd.name}\``).join(" ")}`}]})]})
        }
        const foundCommand = client.commands.find(c => c.name.toLowerCase() === args[0].toLowerCase() || c.aliases?.includes(args[0].toLowerCase()))
        const permissions = []
        if (foundCommand.permissions) {
            foundCommand.permissions.forEach((perm) => { 
                permissions.push(permFormat(perm as string))
        })
        }
        const fields: Array<EmbedFieldData> = [
            { name: `Category`, value: `${stringFormat(foundCommand.category)}`, inline: true },
            { name: `Cooldown`, value: `\`${foundCommand.cooldown ? `${foundCommand.cooldown > 60 ? `${(foundCommand.cooldown / 1000) / 60}m` : `${foundCommand.cooldown / 1000}s`}` : "2s"}\``, inline: true  },
            { name: `Aliases`, value: `${foundCommand.aliases ? `\`${foundCommand.aliases.join("`, `")}\`` : "No aliases"}` },
            { name: `Description`, value: `${foundCommand.description}` },
            { name: `Permissions`, value: `${permissions.length > 0 ? ` - ${permissions.join("\n - ")}` : `No command permissions required.`}`}
        ];
        ctx.channel.send({
            content: `\`${config.prefix}${foundCommand.name}\` information`,
          embeds: [
            new Embed({
              fields: fields,
            }),
          ],
        });
    }
})