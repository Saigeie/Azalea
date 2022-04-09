import { Command } from "../../../structures/Command";
import people from "../../../../schemas/Json/people.json";
import Main from "../../../../schemas/Collections/Users/Main";
import { Embed } from "../../../structures/Embed";
import { _noMoney } from "../../../../schemas/Json/reasons.json";

export default new Command({
    name: `beg`,
    description: `Beg for some coins 😢`,
    category: `economy`,
    cooldown: 35 * 1000,
    execute: async ({ ctx }) => {
        const userData = await Main.findOne({ userId: ctx.author.id })
        const person = people[Math.floor(Math.random() * people.length)] as { name: string; rarity: "common" | "rare" | "lengendary" };
        let amount = Math.floor(Math.random() * 100);
        if(amount <= 0) { return ctx.channel.send({embeds: [new Embed({ description: `**${_noMoney[Math.floor(Math.random() * _noMoney.length)]}**`})]})}
        if (person.rarity === "rare") amount = Math.round(amount * 5);
        if (person.rarity === "lengendary") amount = Math.round(amount * 25);
        await Main.findOne({ userId: ctx.author.id }, {
            wallet: Math.round(userData.wallet + amount)
        })
        return ctx.channel.send({
          embeds: [
            new Embed({
              description: `${
                person.rarity === "lengendary"
                  ? `**JACKPOT**\nYou hit the jack pot meaning you have a 25x bonus!\n\n`
                  : ""
              }${
                person.rarity === "rare"
                  ? `**RARE** 5x bonus`
                  : ""
              } You begged and earned \`${amount}\` coins from **${
                person.name
              }**!`,
            }),
          ],
        });
    }
})