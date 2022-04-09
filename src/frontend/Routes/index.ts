import glob from "glob";
import { promisify } from "util";
import { APIRouteTypes } from "../../typings/classTypes";
import { importFile } from "../../backend/structures/Client";
import { client } from "../..";
const globPromise = promisify(glob);

export const APIRouteHandler = async (app) => {
  const APIFiles: string[] = await globPromise(
    `${process.cwd()}/src/backend/API/**/*.ts`
  );
  APIFiles.forEach(async (filePath) => {
    const route: APIRouteTypes = await importFile(filePath);
    if (!route.name) return;
    const middleware = [];
    if (route.middleware) {
      route.middleware.forEach((mw) => {
        middleware.push(mw);
      });
    }
    app.get(`/api/${route.name}`, middleware, async (req, res) => {
      route.execute(req, res, { client: client });
    });
  });
  app.get("/api", (req, res) => res.send({ msg: `Azalea API`, status: `Soon! / Private`, code: 200}))
};
