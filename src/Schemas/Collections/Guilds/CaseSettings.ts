import { model, Schema } from "mongoose";

export interface CaseSetting {
  guildId: string;
  dmOnCaseUse: boolean;
  max_case_amount: number;
  max_case_action: "ban" | "kick" | "mute";
  delete_message: boolean;
}

export default model(
  "Guilds/CaseSettings",
  new Schema<CaseSetting>({
    guildId: { type: String },
    dmOnCaseUse: { type: Boolean, default: true },
    max_case_amount: { type: Number, default: 10 },
    max_case_action: { type: String, default: "kick" },
  })
);
