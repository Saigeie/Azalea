/**
* Developer - Saige
* Repo: https://github.com/Saigeie/Ruby
* Github: https://github.com/Saigeie/
* 2022
*/

import { config } from "dotenv";
config();
import { createLogger, format, transports, addColors } from "winston";
const { combine, timestamp, label, printf } = format;
import chalk from "chalk";

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${chalk.bold(`${timestamp}`)} ${chalk.redBright(`┃`)} ${message}`;
});

const myCustomLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
  },
  colours: {
    error: `bold red`,
    warn: `bold yellow`,
    info: `bold blue`,
    http: `bold white`,
    verbose: `bold green`,
    debug: `bold cyan`,
    silly: `bold gray`,
  },
};

addColors(myCustomLevels.colours);
const Logger = createLogger({
  levels: myCustomLevels.levels,
  format: combine(
    format.colorize(),
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    myFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "./src/assets/logs/Helper.log" }),
  ],
});

export default Logger;
