import mongoose, {Types, Document} from "mongoose";
import Joi from "joi";
import {handleSaveErrors} from "../helpers";

const {Schema, model} = mongoose;

export interface ICountry extends Document {
    _id?: Types.ObjectId;
    name: string;
}

const countrySchema = new Schema<ICountry>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
}, {versionKey: false, timestamps: true});

countrySchema.post("save", handleSaveErrors);

const Country = model("country", countrySchema);

export const addSchema = Joi.object({
    name: Joi.string().required(),
})

export default Country;