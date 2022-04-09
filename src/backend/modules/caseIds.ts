import Cases from "../../schemas/Collections/Users/Cases"

export const makeId = async (userId: string, guildId: string): Promise<number> => {
    let length: number = 0;
    const data = await Cases.find({ guildId: guildId })
    if (!data) { length = 1; return length };
    data.forEach((x) => { length = length + x.cases.length })
    return length;
}
