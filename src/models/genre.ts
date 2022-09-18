import mongoose, {Types, Document} from "mongoose";
import {handleSaveErrors} from "../helpers";

const {Schema, model} = mongoose;

export interface IGenre extends Document {
    _id?: Types.ObjectId;
    name: string;
}

const genreSchema = new Schema<IGenre>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
}, {versionKey: false, timestamps: true});

genreSchema.post("save", handleSaveErrors);

const Genre = model("genre", genreSchema);

export default Genre;