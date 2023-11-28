import { create } from 'zustand';

const usePlayerStore = create((set) => ({
  curruntSong: null,
  curruntSongIndex: null,
  isPlaying: false,
  isRandom: false,
  isRepeat: 0, // 0: not repeat, 1: repeat all, 2: repeat only one
  volume: 0.5,
  currentTime: 0,
  setCurruntSong: (data) => {
    return set({ curruntSong: data });
  },
  setCurruntSongIndex: (data) => {
    return set({ curruntSongIndex: data });
  },
  setIsPlaying: (data) => {
    return set({ isPlaying: data });
  },
  setIsRandom: (data) => {
    return set({ isRandom: data });
  },
  setIsRepeat: (data) => {
    return set({ isRepeat: data });
  },
  setVolume: (data) => {
    return set({ volume: data });
  },
  setCurrentTime: (data) => {
    return set({ currentTime: data });
  },
}));

export default usePlayerStore;
