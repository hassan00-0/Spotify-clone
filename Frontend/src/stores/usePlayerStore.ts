import { create } from "zustand";
import type { Song } from "@/types";

interface PlayerStore {
  currentSong: Song | null;
  isPlaying: boolean;
  queue: Song[];
  currentIndex: number;

  initializeQueue: (songs: Song[]) => void;
  playAlbum: (songs: Song[], startIndex?: number) => void;
  setCurrentSong: (song: Song | null) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
}

const audio = new Audio();

export const usePlayerStore = create<PlayerStore>((set, get) => {
  audio.addEventListener("ended", () => {
    get().playNext();
  });

  return {
    currentSong: null,
    isPlaying: false,
    queue: [],
    currentIndex: -1,

    initializeQueue: (songs: Song[]) => {
      set({
        queue: songs,
        currentSong: get().currentSong || songs[0],
        currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex,
      });
    },

    playAlbum: (songs: Song[], startIndex = 0) => {
      if (songs.length === 0) return;

      const song = songs[startIndex];

      audio.src = song.audioUrl;
      audio.play();

      set({
        queue: songs,
        currentSong: song,
        currentIndex: startIndex,
        isPlaying: true,
      });
    },

    setCurrentSong: (song: Song | null) => {
      if (!song) return;
      const songIndex = get().queue.findIndex((s) => (s._id = song._id));
      audio.src = song.audioUrl;
      audio.play();

      set({
        currentSong: song,
        isPlaying: true,
        currentIndex: songIndex !== -1 ? songIndex : get().currentIndex,
      });
    },

    togglePlay: () => {
      const willStartPlaying = !get().isPlaying;
      if (willStartPlaying) audio.play();
      else audio.pause();
      set({ isPlaying: willStartPlaying });
    },
    playNext: () => {
      const { currentIndex, queue } = get();
      const nextIndex = currentIndex + 1;

      if (nextIndex < queue.length) {
        const nextSong = queue[nextIndex];

        audio.src = nextSong.audioUrl;
        audio.play();
        set({
          isPlaying: true,
          currentSong: nextSong,
          currentIndex: nextIndex,
        });
      } else {
        set({ isPlaying: false });
      }
    },
    playPrevious: () => {
      const { currentIndex, queue } = get();
      const prevIndex = currentIndex - 1;
      if (prevIndex >= 0) {
        const prevSong = queue[prevIndex];
        audio.play();
        set({
          isPlaying: true,
          currentIndex: prevIndex,
          currentSong: prevSong,
        });
      } else {
        audio.pause();
        set({ isPlaying: false });
      }
    },
  };
});
