import { Album } from "../models/album.model.js";

export const getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.find({});
    if (!albums) {
      return res
        .status(404)
        .json({ success: false, message: "No albums found yet" });
    }
    res.status(200).json({ success: true, albums });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getAlbumById = async (req, res) => {
  try {
    const { albumId } = req.params;
    const album = await Album.findById(albumId).populate("songs");
    if (!album) {
      return res
        .status(404)
        .json({ success: false, message: "Album not found" });
    }
    res.status(200).json({ success: true, album });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
