import { PermissionResolvable } from "discord.js"

export const stringFormat = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}
export const permFormat = (str: string) => {
    const words = str.split("_")
    let ar = []
    words.forEach((w) => { ar.push(stringFormat(w)) })
    return ar.join(" ")
}