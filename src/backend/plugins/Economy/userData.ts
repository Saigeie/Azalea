import { User } from "discord.js";
import Main from "../../../schemas/Collections/Users/Main";

export const getUserData = async (user: User) => {
    const data = await Main.findOne({ userId: user.id });
    return data
}