import express from "express";
import {
  protectRoute,
  requireAdmin,
} from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, requireAdmin, (req, res) => {
  res.send("admin routes working");
});

export default router;
