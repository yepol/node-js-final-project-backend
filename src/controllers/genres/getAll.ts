import {Request, Response} from "express";
import Genre, {IGenre} from "../../models/genre";

const getAll = async (_: Request, res: Response): Promise<void> | never => {
    const result: Array<IGenre> = await Genre.find({}, "-createdAt -updatedAt");
    res.json(result);
}

export default getAll;