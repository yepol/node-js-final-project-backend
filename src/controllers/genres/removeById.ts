import {Response} from "express";
import Genre, {IGenre} from "../../models/genre";
import {RequestError} from "../../helpers";
import {IRequest} from "../../middlewares/authenticate";
import Film from "../../models/film";

const removeById = async (req: IRequest, res: Response): Promise<void | never> => {
    if (req.user?.role === 'admin') {
        const {id} = req.params;
        const result: IGenre | null = await Genre.findOneAndRemove({_id: id});
        if (!result) {
            throw RequestError(404, "Not found");
        }
        Film.update({
            $pull: {genres: {$oid: id}}
        });
        res.status(200).json({
            message: "Genre deleted"
        });
    } else {
        throw RequestError(403, "Forbidden");
    }
}

export default removeById;