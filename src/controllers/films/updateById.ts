import {Response} from "express";
import {IRequest} from "../../middlewares/authenticate";
import Film, {IFilm} from "../../models/film";
import {RequestError} from "../../helpers";

const updateById = async (req: IRequest, res: Response): Promise<void | never> => {
    const {id} = req.params;
    const result: IFilm | null = await Film.findOneAndUpdate({_id: id, owner: req.user?.id}, req.body, {
        new: true,
        runValidators: true
    });
    if (!result) {
        throw RequestError(404, "Not found");
    }
    res.json(result);
}

export default updateById;