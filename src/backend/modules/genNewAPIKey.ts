import { client } from "../..";
import sendError from "./sendError";

const genNewAPIKey = async (length: number = 55) => {
  let chars =
    "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm12345678901234567890QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm12345678901234567890QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm12345678901234567890QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm12345678901234567890QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm12345678901234567890";
  let str = "";
  for (let i = 0; i < length; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }

  if (process.env.PROD === "true") {
    const OWNER = client.users.cache.find((u) => u.id === process.env.OWNER_ID);
    if (!OWNER) return str;
    OWNER.send({
      content: `New API key generated! | Time: <t:${Math.floor(
        Date.now() / 1000
      )}:F>\n\n||\`${str}\`||`,
    });

    sendError("apikey", `**New API key generated.**\n||\`${str}\`||`);
  }
  return str;
};

export default genNewAPIKey;
