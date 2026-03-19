import { Song } from "../models/song.model.js";

export const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find({}).sort({ createAt: -1 });
    if (!songs) {
      return res
        .status(404)
        .json({ success: false, message: "No songs found" });
    }
    res.status(200).json({ success: true, songs });
  } catch (error) {
    console.log("error in getAllSongs ", error);
  }
};

export const getFeaturedSongs = async (req, res) => {
  try {
    const songs = await Song.aggregate([
      {
        $sample: { size: 6 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);
    res.json({ success: true, songs });
  } catch (error) {
    console.log("error in getting featured songs ", error);
    res.status(500).json({ success: true, message: "Internal Server Error" });
  }
};

export const getMadeForYouSongs = async (req, res) => {};

export const getTrendingSongs = async (req, res) => {};
