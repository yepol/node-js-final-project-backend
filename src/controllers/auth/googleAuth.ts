import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../../models/user";
import {Response} from "express";
import {IRequest} from "../../middlewares/authenticate";

dotenv.config();

const {SECRET_KEY = ""} = process.env;

const googleAuth = async (req: IRequest, res: Response) => {
    const id = req.user?.id;
    const payload = {
        id,
    };
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "1h"});
    await User.findByIdAndUpdate(id, {token});
    res.json({
        token
    });
}

export default googleAuth;