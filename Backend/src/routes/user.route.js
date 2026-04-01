import express from "express";
import { protectRoute, requireAdmin } from "../middlewares/auth.middleware.js";
import { getAllUsers } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, getAllUsers);
// todo : getMessages

export default router;
