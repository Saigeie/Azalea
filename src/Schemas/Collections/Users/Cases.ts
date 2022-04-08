import { model, Schema } from "mongoose"

export interface IndividualCase {
    id: string;
    date: number;
    reason: string;
    type: "mute" | "warn" | "ban" | "kick";
    channelId: string;
    moderatorId?: string;
    oldRoles?: Array<string>;
    time?: number
}

export interface Case {
    userId: string;
    guildId: string;
    cases: Array<IndividualCase>
}

export default model("User/Cases", new Schema<Case>({
    userId: { type: String },
    guildId: { type: String },
    cases: [{ type: Object }]
}))