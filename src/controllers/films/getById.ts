import {Response} from "express";
import {IRequest} from "../../middlewares/authenticate";
import Film, {IFilm} from "../../models/film";
import {RequestError} from "../../helpers";

const getById = async (req: IRequest, res: Response) => {
    const {id} = req.params;
    const result: Array<IFilm> | null = await Film.find({_id: id, owner: req.user?.id});
    if (!result[0]) {
        throw RequestError(404, "Not found")
    }
    res.json(result[0]);
}

export default getById;