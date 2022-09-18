import {Response} from "express";
import Film, {IFilm} from './../../models/film';
import {IRequest} from "../../middlewares/authenticate";

const add = async (req: IRequest, res: Response): Promise<void | never> => {
    req.body.owner = req.user?.id;
    const result: IFilm = await Film.create(req.body);
    res.status(201).json(result)
}

export default add;