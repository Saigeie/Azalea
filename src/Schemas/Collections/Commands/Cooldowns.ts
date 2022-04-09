import { model, Schema } from "mongoose";

export interface Cooldown {
  userId: string;
  command: string;
  length: number;
  now: number;
}
export default model(
  "Commands/Cooldowns",
  new Schema<Cooldown>({
    userId: { type: String },
    command: { type: String },
      length: { type: Number },
    now: { type: Number }
  })
);
