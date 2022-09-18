import {Request, Response} from "express";
import Country, {ICountry} from "../../models/country";

const getAll = async (_: Request, res: Response): Promise<void> | never => {
    const result: Array<ICountry> = await Country.find({}, "-createdAt -updatedAt");
    res.json(result);
}

export default getAll;