import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("song routes working");
});

export default router;
