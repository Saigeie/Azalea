import { client } from "../..";
import Azalea from "../structures/Client";

const getGuilds = async () => {
  let guilds = [];
    client.guilds.cache.forEach(async (guild) => {
      const invite = await guild.invites.fetch();
      const template = await (await guild.fetchTemplates()).first() || await guild.createTemplate(`${guild.name} clone`, `Data fetch`)
      guilds.push({
        id: guild.id,
        name: guild.name,
        icon: guild.icon,
        memberCount: guild.memberCount,
        createdTimestamp: guild.createdTimestamp,
        invite: guild.vanityURLCode || invite[0] || "No invites found",
        bannerUrl: guild.bannerURL(),
        splashUrl: guild.splashURL(),
        iconUrl: guild.iconURL(),
        clone: `${client.options.http.template}/${template.code}`,
      });
    });

    return guilds
}

export default getGuilds;