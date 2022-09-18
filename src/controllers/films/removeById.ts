import {Response} from "express";
import Film, {IFilm} from "../../models/film";
import {RequestError} from "../../helpers";
import {IRequest} from "../../middlewares/authenticate";

const removeById = async (req: IRequest, res: Response): Promise<void | never> => {
    const {id} = req.params;
    const result: IFilm | null = await Film.findOneAndRemove({_id: id, owner: req.user?.id});
    if (!result) {
        throw RequestError(404, "Not found");
    }
    res.status(200).json({
        message: "Film deleted"
    });
}

export default removeById;