import { timeStamp } from "console";
import { Guild } from "discord.js";
import { client } from "../../..";
import CaseSettings from "../../../schemas/Collections/Guilds/CaseSettings";
import Cases, {
  IndividualCase,
} from "../../../schemas/Collections/Users/Cases";
import { Embed } from "../../structures/Embed";

export interface Response {
  status?: "failed" | "working" | "finshed";
  msg?: string;
  error?: string;
}

export const AddWarn = async (
  obj: IndividualCase,
  userId: string,
  guildId: string
): Promise<Response> => {
  let userData = await Cases.findOne({ guildId, userId });
  const guild = client.guilds.cache.find((g) => g.id === guildId);
  const caseSettings = await CaseSettings.findOne({ guildId });
  const member = client.guilds.cache
    .find((g) => g.id === guildId)
    .members.cache.find((m) => m.id === userId);
  const resObj: Response = {
    status: "finshed",
    msg: `✅ Warned **${member.user.tag}** (Case: #${obj.id}) ${
      caseSettings.dmOnCaseUse
        ? `(User notified about warn via dm)`
        : `${obj.reason}`
    }`,
    error: undefined,
  };
  if (!userData) {
    await Cases.create({ userId, guildId, cases: [obj] });
    return resObj;
  }
  await Cases.findOneAndUpdate(
    { userId, guildId },
    {
      $push: {
        cases: obj,
      },
    }
  );
  if (caseSettings.dmOnCaseUse) {
    member
      .send({
        embeds: [
          new Embed({
            title: `You have been warned in ${guild.name}`,
            description: `\nInformation:\n\`Time\`: <t:${Math.floor(
              obj.date / 1000
            )}:F>\n\`Reason\`: ${obj.reason}`,
            footer: { text: `Case Id: #${obj.id}` },
            timestamp: Date.now(),
          }),
        ],
      })
      .catch(() => {
        resObj["error"] = `Failed to DM user.`;
      });
  }
  return resObj;
};

export const DelWarn = async (id: string, guild: Guild) => {
  const cases = await Cases.find({ guildId: guild.id });
  let index: { userId: string; index: number };
  cases.forEach((x) => {
    x.cases.forEach((v) => {
      if (v.type === "warn" && v.id === id) {
        return (index = { userId: x.userId, index: x.cases.indexOf(v) });
      }
    });
  });
  if (!index) {
    return;
  }
  let userCases = await Cases.findOne({
    guildId: guild.id,
    userId: index.userId,
  });
  userCases.cases.splice(index.index, 1);
  userCases.save();
  userCases = await Cases.findOne({
    guildId: guild.id,
    userId: index.userId,
  });
  if (!userCases.cases || userCases.cases.length < 1) {
    await Cases.findOneAndRemove({ userId: index.userId, guildId: guild.id });
  }
  return index;
};

export const TestWarns = async (userId: string, guild: Guild) => {
  if (process.env.PROD === "false") return;
  const cases = await Cases.findOne({ guildId: guild.id, userId });
  const caseSettings = await CaseSettings.findOne({ guildId: guild.id });
  if (!cases || !caseSettings) return;
  if (
    !(
      cases.cases.filter((f) => f.type === "warn").length >=
      caseSettings.max_case_amount
    )
  )
    return;
  const member = guild.members.cache.find((m) => m.id === userId);
  if (!member) return;
  switch (caseSettings.max_case_action) {
    case "ban":
      member.ban({ reason: `Warning cap reached. | ${client.user.tag}` });
      break;
    case "kick":
      member.kick(`Warning cap reached. | ${client.user.tag}`);
      break;
    case "mute":
      // Need to make mute function.
      break;
  }
};
