import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("stats routes working");
});

export default router;
