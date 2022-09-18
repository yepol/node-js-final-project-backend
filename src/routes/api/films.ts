import express from "express";
import * as ctrl from "../../controllers/films";
import {ctrlWrapper} from "../../helpers";
import {validateBody} from './../../middlewares';
import {addSchema} from "../../models/film";
import passport from "passport";

const router = express.Router();


router.get("/", passport.authenticate("jwt", {session: false}), ctrlWrapper(ctrl.getAll));

router.get("/:id", passport.authenticate("jwt", {session: false}), ctrlWrapper(ctrl.getById));

router.post("/", passport.authenticate("jwt", {session: false}), validateBody(addSchema), ctrlWrapper(ctrl.add));

router.put("/:id", passport.authenticate("jwt", {session: false}), validateBody(addSchema), ctrlWrapper(ctrl.updateById));

router.delete("/:id", passport.authenticate("jwt", {session: false}), ctrlWrapper(ctrl.removeById));

export default router;