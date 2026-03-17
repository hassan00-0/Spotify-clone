import express from "express";
import {
  protectRoute,
  requireAdmin,
} from "../../middlewares/auth.middleware.js";

import { createSong } from "../controllers/admin.controller.js";
const router = express.Router();

router.get("/", protectRoute, requireAdmin, createSong);

export default router;
