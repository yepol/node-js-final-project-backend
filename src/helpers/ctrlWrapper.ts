import {NextFunction, Request, Response} from "express";

const ctrlWrapper = (ctrl: (req: any, res: Response, next: NextFunction) => {}) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await ctrl(req, res, next);
        } catch (error) {
            next(error);
        }
    };
}

export default ctrlWrapper;