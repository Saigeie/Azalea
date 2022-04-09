import { model, Schema } from "mongoose";

export interface Tag {
    trigger: string;
    response: string;
    embed: boolean;
    embed_title: string;
    embed_color: string;
    embed_footer: string;
    replied: boolean;
}
export interface Tags {
  guildId: string;
  tags: Array<Tag>
}

export default model(
  "Guilds/Tags",
  new Schema<Tags>({
    guildId: { type: String },
    tags: [{ type: Object }]
  })
);
