import passportGoogle, {StrategyOptionsWithRequest, VerifyFunctionWithRequest, VerifyCallback} from "passport-google-oauth2";
import dotenv from "dotenv";
import User from "../../models/user";
import {Request} from "express";

dotenv.config();

const {GOOGLE_CLIENT_ID = '', GOOGLE_CLIENT_SECRET = '', GOOGLE_CALLBACK_URL = ''} = process.env;

const GoogleStrategy = passportGoogle.Strategy;

const googleParams: StrategyOptionsWithRequest = {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL,
    passReqToCallback: true,
};

const googleCallback: VerifyFunctionWithRequest = async (req: Request, accessToken: string, refreshToken: string,
                                                         profile: any, done: VerifyCallback): Promise<void> => {
    try {
        const {email, displayName} = profile;
        const user = await User.findOne({email});
        if (user) {
            return done(null, user);
        }
        const newUser = await User.create({email, name: displayName});
        done(null, newUser);
    } catch (error) {
        done(error, false);
    }
}

const googleStrategy = new GoogleStrategy(googleParams, googleCallback);

export default googleStrategy;