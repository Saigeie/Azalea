/**
* Developer - Saige
* Repo: https://github.com/Saigeie/Ruby
* Github: https://github.com/Saigeie/
* 2022
*/

import express from "express";
import { client } from "..";

const app = express();

const Main = async () => {
    app.get("/", (req, res) => {
      res.send({ msg: `Azalea`, status: `Coming soon!`, code: 404 });
    });

    app.listen(process.env.PORT || 3000, () => client.logger.info(`Dashboard is now online!`))
}

export default Main;