import { Message } from "discord.js";

const messageDelete = async (msg: Message, time: number = 100) => {
    setTimeout(() => {
        msg.delete().catch(() => {});
    }, time);
}

export default messageDelete;