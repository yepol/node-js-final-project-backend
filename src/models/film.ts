import mongoose, {Document, Types} from "mongoose";
import Joi from "joi";
import {handleSaveErrors} from "../helpers";

const {Schema, model} = mongoose;

export interface IFilm extends Document {
    _id: Types.ObjectId;
    name: string;
    year: string;
    watched: boolean;
    selected: boolean;
    links: Array<string>;
    genres: Array<Types.ObjectId>;
    countries: Array<Types.ObjectId>;
    owner: Types.ObjectId
}

const yearRegexp = /^(18|19|20)\d{2}$/;

const filmSchema = new Schema<IFilm>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    year: {
        type: String,
        validate: {
            validator(value: string) {
                return yearRegexp.test(value);
            },
            message: (props) => `${props.value} must have 4 numbers: "2020" `
        },
        required: true,
    },
    watched: {
        type: Boolean,
    },
    selected: {
        type: Boolean,
    },
    links: [{
        type: Schema.Types.String,
        required: true,
        match: /https?:\/\/(www\.)?[-a-zA-Z\d@:%._+~#=]{1,256}\.[a-zA-Z\d()]{1,6}\b([-a-zA-Z\d()@:%_+.~#?&/=]*)/
    }],
    genres: [{
        type: Schema.Types.ObjectId,
        ref: "genre",
        required: true,
    }],
    countries: [{
        type: Schema.Types.ObjectId,
        ref: "country",
        required: true,
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
        require: true,
    }
}, {versionKey: false, timestamps: true});

export const addSchema = Joi.object({
    name: Joi.string().required(),
    year: Joi.string().pattern(yearRegexp).required(),
    genres: Joi.array().required(),
    countries: Joi.array().required(),
    links: Joi.array().required(),
})

filmSchema.post("save", handleSaveErrors);

const Film = model("film", filmSchema);

export default Film;