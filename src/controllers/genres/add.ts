import {Response} from "express";
import {IRequest} from "../../middlewares/authenticate";
import Genre, {IGenre} from "../../models/genre";
import {RequestError} from "../../helpers";

const add = async (req: IRequest, res: Response): Promise<void> | never => {
    if (req.user?.role === 'admin') {
        const result: IGenre = await Genre.create(req.body);
        res.status(201).json(result);
    } else {
        throw RequestError(403, "Forbidden");
    }

}

export default add;