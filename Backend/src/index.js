import express from "express";
import dotenv from "dotenv";
// route imports
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import songRoutes from "./routes/song.route.js";
import albumRoutes from "./routes/album.route.js";
import statRoutes from "./routes/stats.route.js";
import { connectDb } from "./lib/db.js";

dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
// route middlewares
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

app.listen(PORT, () => {
  connectDb();
  console.log("listening on port ", PORT);
});
