import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const currentUserId = req.auth.userId;
    const users = await User.find({ clerkId: { $ne: currentUserId } });
    res.json({ success: true, users });
  } catch (error) {
    console.log("error in getting all users ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
