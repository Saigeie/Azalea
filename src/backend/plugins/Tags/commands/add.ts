import { Command } from "../../../structures/Command";

export default new Command({
  name: `tag_add`,
  description: `Add a new tag`,
  category: "tags",
  errorMessages: ["Please supply a valid tag / response."],
  execute: async ({ ctx, command, config, args }) => {
    const [tag, res] = args;
    if (!tag || !res) {
      return ctx.channel.send({ content: command.errorMessages[0] });
    }
  },
});
