import {Response} from "express";
import {IRequest} from "../../middlewares/authenticate";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../../models/user";

dotenv.config();

const {SECRET_KEY = ""} = process.env;

const facebookAuth = async (req: IRequest, res: Response): Promise<void> | never => {
    const id = req.user?.id;
    const payload = {
        id,
    };
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "24h"});
    await User.findByIdAndUpdate(id, {token});
    res.json({
        token,
    });
};

export default facebookAuth;