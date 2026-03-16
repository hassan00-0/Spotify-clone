import mongoose from "mongoose";
export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected successfully to mongoDb");
  } catch {
    console.log("error connecting to mongoDb");
    process.exit(1);
  }
};
