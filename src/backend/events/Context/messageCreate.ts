/**
* Developer - Saige
* Repo: https://github.com/Saigeie/Ruby
* Github: https://github.com/Saigeie/
* 2022
*/

import { client } from "../../..";
import formatArgs from "../../modules/args";
import { Event } from "../../structures/Event";

export default new Event(`messageCreate`, async (message) => {
  if (message.author.bot || !message.guild || !message.content.startsWith(client.config.prefix))
    return;
  const [cmd, ...args]: string[] = message.content
    .slice(client.config.prefix.length)
    .trim()
    .split(/ +/g);
  const command =
    client.commands.get(cmd.toLowerCase()) ||
    client.commands.find((c) => c.aliases?.includes(cmd.toLowerCase()));
    if (command) {
      const formattedArgs = await formatArgs(
        message.content.slice(client.config.prefix.length).trim()
      );
    await command.execute({
      client: client,
      ctx: message,
      args: args,
      formattedArgs: formattedArgs,
    });
  } else {
    // Custom Commands
  }
});
