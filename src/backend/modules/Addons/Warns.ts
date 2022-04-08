import { client } from "../../..";
import CaseSettings from "../../../schemas/Collections/Guilds/CaseSettings";
import GuildMain from "../../../schemas/Collections/Guilds/GuildMain";
import Cases, { IndividualCase } from "../../../schemas/Collections/Users/Cases";

export interface Response {
    status?: "failed" | "working" | "finshed";
    msg?: string;
}

export const AddWarn = async (obj: IndividualCase, userId: string, guildId: string): Promise<Response> => {
    let userData = await Cases.findOne({ guildId, userId })
    const caseSettings = await CaseSettings.findOne({ guildId })
    const member = client.guilds.cache.find(g => g.id === guildId).members.cache.find(m => m.id === userId)
    const resObj: Response = { status: "finshed", msg: `✅ Warned **${member.user.tag}** (Case: #${obj.id}) ${caseSettings.dmOnCaseUse ? `(User notified about warn via dm)` : `${obj.reason}`}` }
    if (!userData) {
        await Cases.create({ userId, guildId, cases: [obj] })
        return resObj
    }
    await Cases.findOneAndUpdate({ userId, guildId }, {
        $push: {
            cases: obj
        }
    })
    return resObj
}