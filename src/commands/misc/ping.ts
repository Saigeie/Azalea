import { Command } from "../../structures/Command";

export default new Command({
    name: `ping`,
    description: `✨ | See the client's ping`,
    category: "misc",
    execute: async ({ ctx, client }) => {
        ctx.reply({content: `\`${client.ws.ping}\`ms`})
    }
})