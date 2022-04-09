import { Command } from "../../../structures/Command";

export default new Command({
  name: "ping",
  description: "See azalea's ws ping.",
  category: "misc",
  aliases: ["p"],
  execute: async ({ ctx, client }) => {
    ctx.channel.send({ content: `\`${client.ws.ping}\`ms` });
  },
});
