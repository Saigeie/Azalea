/**
 * Developer - Saige
 * Repo: https://github.com/Saigeie/Azalea
 * Github: https://github.com/Saigeie/
 * 2022
 */

import { config } from "dotenv";
import Azalea from "./backend/structures/Client";
import dash from "./frontend/server"
export const client = new Azalea();
config();
client.start();
dash()
