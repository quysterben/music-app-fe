import { create } from 'zustand';

const usePlayerStore = create((set) => ({
  curruntSong: null,
  curruntSongIndex: null,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  volume: 0.5,
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
}));

export default usePlayerStore;
