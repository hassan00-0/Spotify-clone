import { Song } from "../models/song.model.js";

const songProjection = {
  $project: {
    _id: 1,
    title: 1,
    artist: 1,
    imageUrl: 1,
    audioUrl: 1,
  },
};

export const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find({}).sort({ createdAt: -1 });
    if (!songs) {
      return res
        .status(404)
        .json({ success: false, message: "No songs found" });
    }
    res.status(200).json({ success: true, songs });
  } catch (error) {
    console.log("error in getAllSongs ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getFeaturedSongs = async (req, res) => {
  try {
    // fetch 6 random songs
    const songs = await Song.aggregate([
      {
        $sample: { size: 6 },
      },
      songProjection,
    ]);
    res.json({ success: true, songs });
  } catch (error) {
    console.log("error in getting featured songs ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getMadeForYouSongs = async (req, res) => {
  try {
    // fetch 4 random songs
    const songs = await Song.aggregate([
      {
        $sample: { size: 4 },
      },
      songProjection,
    ]);
    res.json({ success: true, songs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getTrendingSongs = async (req, res) => {
  try {
    const songs = await Song.aggregate([
      {
        $sample: { size: 4 },
      },
      songProjection,
    ]);
    res.json({ success: true, songs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
