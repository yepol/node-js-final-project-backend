import passport from "passport";
import {googleStrategy, facebookStrategy, jwtStrategy} from './auth-strategies/index';
import {Request} from "express";
import {IUser} from "../models/user";

passport.use("google", googleStrategy);
passport.use("facebook", facebookStrategy);
passport.use("jwt", jwtStrategy);

export default passport;

export interface IRequest extends Request {
    user?: IUser | undefined
}