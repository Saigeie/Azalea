import { Guild } from "discord.js";

const getMember = async (input: string, guild: Guild) => {
    if (!input || !guild) return;
    return guild.members.cache.find(m => m.id === input || m.user.tag.toLowerCase() === input.toLowerCase() || m.user.username.toLowerCase() === input.toLowerCase())
}
export default getMember;