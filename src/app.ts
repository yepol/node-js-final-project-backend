import express, {Express, Request, Response, NextFunction} from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {IRequestError} from "./interfaces";
import * as api from "./routes/api/index";
import * as pages from "./routes/pages/index";

dotenv.config();

const {DB_HOST = '', PORT = 3000} = process.env;

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", api.auth);
app.use("/api/films", api.films);
app.use("/api/countries", api.countries);
app.use("/api/genres", api.genres);
app.use("/pages/auth", pages.auth);

app.use((req: Request, res: Response): void => {
    const {url} = req;
    res.status(404).json({
        message: `${url} not found`,
    })
});

app.use((error: IRequestError, req: Request, res: Response, _: NextFunction): void => {
    const {status = 500, message = "Server error"} = error;
    res.status(status).json({
        message,
    })
});

mongoose.connect(DB_HOST)
    .then(() => app.listen(PORT))
    .catch((error): void => {
        console.log(error.message);
        process.exit(1);
    });
