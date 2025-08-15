import express from "express";
import * as UserController from "../Controller/user.js";
import auth from "../authintication/auth.js"; // import the middleware function directly

const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
// router.post("/google", UserController.loginThroughGmail);
router.post("/logout", UserController.logout);

export default router;
