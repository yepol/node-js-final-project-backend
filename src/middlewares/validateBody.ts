import {NextFunction, Request, Response} from 'express';
import {RequestError} from '../helpers';

const validateBody = (schema: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const {error} = schema.validate(req.body);
        if (error) {
            const reqError = RequestError(400, error.message);
            next(reqError);
        }
        next();
    };
}

export default validateBody;