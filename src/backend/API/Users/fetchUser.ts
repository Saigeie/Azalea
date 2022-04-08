import { apikey } from "../../modules/middleware/apikey";
import { APIRoute } from "../../structures/Routes";

export default new APIRoute({
    name: `fetchuser`,
    middleware: [apikey],
    execute: async (req, res) => {
        res.send({ msg: `User: userId`})
    }
})