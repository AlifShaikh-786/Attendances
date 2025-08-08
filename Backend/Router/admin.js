const express = require("express");
const router = express.Router();
const UserController = require("../controller/admin");
const Authintication = require("../authintication/auth");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/google", UserController.loginThroughGmail);

router.put("/update", Authintication.auth, UserController.updateUser);
// router.get("/user/:id", UserController.getProfileById);
router.post("/logout", Authintication.auth, UserController.logout);

module.exports = router;
