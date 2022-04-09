import { User } from "discord.js";
import getMember from "../../../modules/getMember";
import { Command } from "../../../structures/Command";
import { Embed } from "../../../structures/Embed";
import { getUserData } from "../userData";

export default new Command({
    name: `balance`,
    description: `See your own / another users balance.`,
    aliases: ["bal"],
    category: "economy",
    errorMessages: ["No user data found."],
    expectedArgs: ["!balance <member>"],
    cooldown: 5 * 1000,
    execute: async ({ ctx, command, args, client }) => {
        const user = (await getMember(args[0] as string || ctx.author.id, ctx.guild)).user
        const userData = await getUserData(user);
        if(!userData) { return ctx.channel.send({embeds: [new Embed({ description: `No data found for **${user.tag}**`})]})}
        const { coin } = client.config.emojis
        ctx.channel.send({
            embeds: [new Embed({
                author: {name: `${user.username}'s Wallet`},
                description: `**Wallet**: ${coin} \`${userData.wallet}\`\n**Bank**: ${coin} \`${userData.bank}/${userData.bank_cap}\``,
                footer: { text: `Mutilplier: ${userData.multi}%` },
                timestamp: Date.now()
            })]
        })
    }
})