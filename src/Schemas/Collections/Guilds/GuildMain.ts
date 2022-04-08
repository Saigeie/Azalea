import { model, Schema } from "mongoose";

export interface Guild {
  guildId: string;
  prefix: string;
  blacklistedUsers: Array<string>;
}

export default model(
  "Guilds/Main",
  new Schema<Guild>({
    guildId: { type: String },
    prefix: { type: String, default: "!" },
    blacklistedUsers: [{ type: String }]
  })
);
