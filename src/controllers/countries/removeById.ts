import {Response} from "express";
import Country, {ICountry} from "../../models/country";
import Film from "../../models/film";
import {RequestError} from "../../helpers";
import {IRequest} from "../../middlewares/authenticate";

const removeById = async (req: IRequest, res: Response): Promise<void | never> => {
    if (req.user?.role === 'admin') {
        const {id} = req.params;
        const result: ICountry | null = await Country.findOneAndRemove({_id: id});
        if (!result) {
            throw RequestError(404, "Not found");
        }
        Film.update({
            $pull: {countries: {$oid: id}}
        });
        res.status(200).json({
            message: "Country deleted"
        });
    } else {
        throw RequestError(403, "Forbidden");
    }
}

export default removeById;