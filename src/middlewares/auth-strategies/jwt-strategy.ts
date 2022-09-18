import {ExtractJwt, Strategy, VerifiedCallback} from "passport-jwt";
import {JwtPayload} from "jsonwebtoken";
import dotenv from "dotenv";
import User, {IUser} from "../../models/user";
import {RequestError} from "../../helpers";

dotenv.config();

const {SECRET_KEY = "", DEFAULT_ADMIN_EMAIL = ""} = process.env;

const params = {
    secretOrKey: SECRET_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const jwtStrategy = new Strategy(params, async (payload: JwtPayload, done: VerifiedCallback) => {
    const user: IUser | null = await User.findById(payload.id);
    if (!user) {
        done(RequestError(401, "User not found"));
    }
    if (!user?.token) {
        done(RequestError(401, "Token expired"));
    }
    if (user?.email === DEFAULT_ADMIN_EMAIL) {
        user.role = 'admin';
    }
    done(null, user);
});

export default jwtStrategy;
