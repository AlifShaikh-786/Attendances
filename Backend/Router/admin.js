import express from "express";
import { adminLogin } from "../Controller/admin.js";

const router = express.Router();

router.post("/admin/login", adminLogin);

export default router;
