import getGuilds from "../../modules/guilds";
import { APIRoute } from "../../structures/Routes";
export default new APIRoute({
  name: `data/@me`,
  execute: async (req, res, { client }) => {
    const guilds = await getGuilds();
    setTimeout(() => {
      res.send({
        "@me": {
          id: client.user.id,
          discriminator: client.user.discriminator,
          username: client.user.username,
          guilds: guilds,
          config: client.config,
        },
        stats: {
          guildSize: client.guilds.cache.size,
          userSize: client.users.cache.size,
          ping: client.ws.ping,
        },
      });
    }, 1000);
  },
});
