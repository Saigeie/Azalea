
import getGuilds from "../../modules/guilds";
import { apikey } from "../../modules/middleware/apikey";
import { APIRoute } from "../../structures/Routes";

export default new APIRoute({
    name: `data/@users`,
    middleware: [apikey],
  execute: async (req, res, { client }) => {
      const users = []
      client.users.cache.forEach((user) => {
          users.push({
              id: user.id,
              username: user.username,
              discriminator: user.discriminator,
              avatar: user.displayAvatarURL(),
              bot: user.bot,
              createdTimestamp: user.createdTimestamp,
          })
      })
    setTimeout(() => {
        res.send({
            userCount: client.users.cache.size,
            _users: users,
      });
    }, 1000);
  },
});
