import getGuilds from "../../modules/guilds";
import { apikey } from "../../modules/middleware/apikey";
import { APIRoute } from "../../structures/Routes";

export default new APIRoute({
  name: `data/@guilds`,
  middleware: [apikey],
  execute: async (req, res, { client }) => {
    const guilds = await getGuilds();
    setTimeout(() => {
      res.send(guilds);
    }, 1000);
  },
});
