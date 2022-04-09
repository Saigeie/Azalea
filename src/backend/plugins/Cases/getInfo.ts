import { Guild } from "discord.js";
import Cases, { IndividualCase } from "../../../schemas/Collections/Users/Cases";

const getInfo = async (id: string, guild: Guild) => {
    const cases = await Cases.find({ guildId: guild.id });
        let index: { userId: string; case: IndividualCase };
        cases.forEach((x) => {
          x.cases.forEach((v) => {
            if (v.id === id) {
              return (index = { userId: x.userId, case: v });
            }
          });
        });
        if (!index) {
          return;
    }

    return index;
    
};
export default getInfo