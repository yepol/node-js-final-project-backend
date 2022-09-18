import express, {Router} from "express";
import * as ctrl from "../../controllers/auth";
import {ctrlWrapper} from './../../helpers';
import {validateBody} from "../../middlewares";
import {registerSchema, loginSchema} from "../../models/user";
import passport from "passport";

const router: Router = express.Router();

//signup
router.post("/register", validateBody(registerSchema), ctrlWrapper(ctrl.register));

// signin
router.post("/login", validateBody(loginSchema), ctrlWrapper(ctrl.login));

router.get("/current", passport.authenticate("jwt", {session: false}), ctrlWrapper(ctrl.getCurrent));

router.get("/logout", passport.authenticate("jwt", {session: false}), ctrlWrapper(ctrl.logout));


router.get("/google", passport.authenticate("google", {scope: ["email", "profile"]}));

router.get("/google/callback", passport.authenticate("google", {session: false}), ctrlWrapper(ctrl.googleAuth));

router.get("/facebook", passport.authenticate("facebook", {scope: ["public_profile"]}));

router.get("/facebook/callback", passport.authenticate("facebook", {session: false}), ctrlWrapper(ctrl.facebookAuth));

export default router;