import passportFacebook, {StrategyOptionWithRequest, VerifyFunctionWithRequest, Profile} from "passport-facebook";

import dotenv from "dotenv";
import User from "../../models/user";
import {Request} from "express";

dotenv.config();

const {FACEBOOK_CLIENT_ID = '', FACEBOOK_CLIENT_SECRET = '', FACEBOOK_CALLBACK_URL = ''} = process.env;

const facebookParams: StrategyOptionWithRequest = {
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET,
    callbackURL: FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'emails', 'displayName'],
    passReqToCallback: true
};

const facebookCallback: VerifyFunctionWithRequest = async (req: Request, accessToken: string, refreshToken: string,
                                                           profile: Profile, done:  (error: any, user?: any, info?: any) => void): Promise<void> => {
    try {
        const {email, name} = profile._json;
        const user = await User.findOne({email});
        if (user) {
            return done(null, user);
        }
        const newUser = await User.create({email, name: name});
        done(null, newUser);
    } catch (error) {
        done(error, false);
    }
};

const FacebookStrategy = passportFacebook.Strategy;

const facebookStrategy = new FacebookStrategy(facebookParams, facebookCallback);

export default facebookStrategy;