import Cases from "../../schemas/Collections/Users/Cases"

export const makeId = async (userId: string, guildId: string): Promise<number> => {
    let length: number;
    const data = await Cases.findOne({ userId: userId, guildId: guildId })
    if (!data) { length = 1; return length };
    length = data.cases.length + 1;
    return length;
}

export const getId = async () => {

}