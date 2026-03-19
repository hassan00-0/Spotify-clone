import express from "express";
import { getAlbumById, getAllAlbums } from "../controllers/album.controller";

const router = express.Router();

router.get("/", getAllAlbums);
router.get("/:albumId", getAlbumById);

export default router;
