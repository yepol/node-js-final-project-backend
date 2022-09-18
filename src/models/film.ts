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

const yearRegexp = /^\d{4}$/;

const filmSchema = new Schema<IFilm>({
    name: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        validate: {
            validator(value: string) {
                if (yearRegexp.test(value)) {
                    let current_year = new Date().getFullYear();
                    if (+value >= 1880 && +value <= current_year) {
                        return true;
                    }
                }
                return false;
            },
            message: (props) => `${props.value} must between 1880 and current year `
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
});

filmSchema.index({"name": 1, "owner": 1}, {"unique": true});

filmSchema.post("save", handleSaveErrors);

const Film = model("film", filmSchema);

export default Film;