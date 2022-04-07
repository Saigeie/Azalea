import chalk from "chalk";
import { connect } from "mongoose";
import { client } from "..";

/**
 * Developers - KeyCats ( JNSP, Saige, Kanna )
 * Repo: https://github.com/KeyCats/Azalea
 * Github: https://github.com/KeyCats/Azalea
 * 2022
 */

export default function () {
  connect(`${process.env.MONGO_DB}`)
    .then(() => {
      client.logger.info(`${chalk.redBright(`Connected to database`)}`);
    })
    .catch((err) => {
      client.logger.info(`${chalk.redBright(`Failed to connect to database`)}`);
      console.log(err);
    });
}
