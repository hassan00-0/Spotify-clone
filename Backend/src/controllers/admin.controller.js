import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import cloudinary from "../lib/cloudinary.js";

// handle file uploads to cloudinary
const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });
    return result.secure_url;
  } catch (error) {
    console.log("Error in uploading files to cloudinary ", error);
    throw new Error("Error uploading to cloudinary");
  }
};

export const createSong = async (req, res, next) => {
  try {
    // make sure all files are provided
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all files." });
    }

    const { title, artist, duration, albumId } = req.body;
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;

    // upload the files
    const audioUrl = await uploadToCloudinary(audioFile);
    const imageUrl = await uploadToCloudinary(imageFile);

    // create the new song
    const song = new Song({
      title,
      artist,
      imageUrl,
      audioUrl,
      duration,
      albumId: albumId || null,
    });

    await song.save();

    // add it to its album
    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $push: { songs: song._id },
      });
    }
    res.status(201).json({ success: true, song });
  } catch (error) {
    console.log("Error in create song ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;

    // get the song and check if it exists
    const song = await Song.findById(id);
    if (!song) {
      return res
        .status(404)
        .json({ success: false, message: "Song not found" });
    }
    // if its in an album remove it
    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      });
    }
    // delete it from db
    await Song.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Song deleted successfully" });
  } catch (error) {
    console.log("error in deleting song ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const createAlbum = async (req, res, next) => {
  try {
    const { title, artist, releaseYear } = req.body;
    const { imageFile } = req.files;
    if (!req.files || !req.files.imageFile)
      return res.status(400).json({
        success: false,
        message: "please provide the image of the album",
      });
    const imageUrl = await uploadToCloudinary(imageFile);

    if (!title || !artist || !imageUrl || !releaseYear) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const newAlbum = new Album({
      title,
      artist,
      imageUrl,
      releaseYear,
    });
    await newAlbum.save();
    res.status(201).json({ success: true, newAlbum });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;

    const album = await Album.findById(id);
    if (!album) {
      return res
        .status(404)
        .json({ success: false, message: "Album not found" });
    }
    await Song.deleteMany({ albumId: id });
    await Album.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Album deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
