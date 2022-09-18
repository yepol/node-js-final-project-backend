import express from "express";
import * as ctrl from "../../controllers/countries";
import {ctrlWrapper} from "../../helpers";
import passport from "passport";

const router = express.Router();

router.get("/", passport.authenticate("jwt", {session: false}), ctrlWrapper(ctrl.getAll));

router.post("/", passport.authenticate("jwt", {session: false}), ctrlWrapper(ctrl.add));

router.put("/:id", passport.authenticate("jwt", {session: false}), ctrlWrapper(ctrl.updateById));

router.delete("/:id", passport.authenticate("jwt", {session: false}), ctrlWrapper(ctrl.removeById));

export default router;