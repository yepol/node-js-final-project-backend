import {Response} from "express";
import {IRequest} from "../../middlewares/authenticate";
import Country, {ICountry} from "../../models/country";
import {RequestError} from "../../helpers";

const updateById = async (req: IRequest, res: Response): Promise<void | never> => {
    if (req.user?.role === 'admin') {
        const {id} = req.params;
        const result: ICountry | null = await Country.findOneAndUpdate({_id: id}, req.body, {
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