import mongoose, {Document} from 'mongoose';
import Joi from "joi";
import {handleSaveErrors} from "../helpers";

const {Schema, model} = mongoose;

export interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    password: string;
    token?: string;
    role?: string;
}

const emailRegexp =  /^[a-z-.\d]+@(\w+\.|\w+\.\w+\.)[a-z]+$/i;

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        match: emailRegexp,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: 6,
    },
    token: {
        type: String,
        default: "",
    },
    role: {
        type: String,
        default: "user",
    }
}, {versionKey: false, timestamps: true});

userSchema.post("save", handleSaveErrors);

export const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
    repeat_password: Joi.ref("password"),
});

export const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const User = model("user", userSchema);

export default User;