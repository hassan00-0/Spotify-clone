import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("admin routes working");
});

export default router;
