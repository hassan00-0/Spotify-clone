import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
// route imports
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import songRoutes from "./routes/song.route.js";
import albumRoutes from "./routes/album.route.js";
import statRoutes from "./routes/stats.route.js";
import fileUpload from "express-fileupload";
import path from "path";
import cors from "cors";
import { connectDb } from "./lib/db.js";

dotenv.config();

const PORT = process.env.PORT;
const app = express();
const __dirname = path.resolve();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(clerkMiddleware()); // to be able to attack clerk auth to req
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "temp"),
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
  }),
);

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

// todo: socket.io
