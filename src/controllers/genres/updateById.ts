import {Response} from "express";
import {IRequest} from "../../middlewares/authenticate";
import Genre, {IGenre} from "../../models/genre";
import {RequestError} from "../../helpers";

const updateById = async (req: IRequest, res: Response): Promise<void | never> => {
    if (req.user?.role === 'admin') {
        const {id} = req.params;
        const result: IGenre | null = await Genre.findOneAndUpdate({_id: id}, req.body, {
            new: true,
            runValidators: true
        });
        if (!result) {
            throw RequestError(404, "Not found");
        }
        res.json(result);
    } else {
        throw RequestError(403, "Forbidden");
    }
}

export default updateById;