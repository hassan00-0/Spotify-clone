import express from "express";
import { User } from "../models/user.model.js";
const router = express.Router();

export const authCallback = async (req, res) => {
  const { id, firstName, lastName, imageUrl } = req.body;
  try {
    const user = await User.findOne({ clerkId: id });
    if (!user) {
      await User.create({
        fullName: `${firstName} ${lastName}`,
        imageUrl,
        clerkId: id,
      });
      return res
        .status(201)
        .json({ success: true, message: "new user created successfully" });
    }
    res.status(200).json({ success: true, message: "User logged in" });
  } catch (error) {
    console.log(`error in auth callback controller ${error}`);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
