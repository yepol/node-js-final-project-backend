import {Response} from "express";
import Film, {IFilm} from "../../models/film";
import {IRequest} from "../../middlewares/authenticate";

const getAll = async (req: IRequest, res: Response): Promise<void> => {
    const {page = 1, limit = 10} = req.query;
    const skip: number = (Number(page) - 1) * Number(limit);
    const result: Array<IFilm> = await Film.find({owner: req.user?.id}, "-createdAt -updatedAt", {skip, limit: Number(limit)})
        .populate("owner", "email")
        .populate("countries", "_id name")
        .populate("genres", "_id name");
    res.json(result);
}

export default getAll;