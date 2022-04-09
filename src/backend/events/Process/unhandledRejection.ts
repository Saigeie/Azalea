import { client } from "../../.."

process.on("unhandledRejection", (reason) => {
    client.logger.error(`${reason}`)
})