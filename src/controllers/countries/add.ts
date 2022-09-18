import {Response} from "express";
import {IRequest} from "../../middlewares/authenticate";
import Country, {ICountry} from "../../models/country";
import {RequestError} from "../../helpers";

const add = async (req: IRequest, res: Response): Promise<void> | never => {
    if (req.user?.role === 'admin') {
        const result: ICountry = await Country.create(req.body);
        res.status(201).json(result);
    } else {
        throw RequestError(403, "Forbidden");
    }
}

export default add;