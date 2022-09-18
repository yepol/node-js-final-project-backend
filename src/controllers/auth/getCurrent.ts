import {Response} from "express";
import {IRequest} from "../../middlewares/authenticate";
import Film, {IFilm} from './../../models/film';

const getCurrent = async (req: IRequest, res: Response): Promise<void> | never => {
    const result: Array<IFilm> = await Film.find({owner: req.user?.id})
        .populate("owner", "email")
        .populate("countries", "_id name")
        .populate("genres", "_id name");
    res.json({
        id: req.user?.id,
        name: req.user?.name,
        email: req.user?.email,
        role: req.user?.role,
        films: result
    })
}

export default getCurrent;