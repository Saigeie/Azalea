import { NextFunction, Request, Response } from "express";
import { client } from "../../..";

export const apikey = async (req: Request, res: Response, next: NextFunction) => {
    const { key } = req.query;
    if (!key || key !== client.APIKey) return res.redirect("/api");
    next()
}
