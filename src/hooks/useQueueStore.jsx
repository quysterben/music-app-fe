import { create } from 'zustand';

const useQueueStore = create((set) => ({
  queue: [],
  initQueue: (data) => {
    return set({ queue: data });
  },
  addSongToQueue: (data) => {
    return set((state) => ({ queue: [...state.queue, data] }));
  },
  removeSongFromQueue: (data) => {
    return set((state) => ({ queue: state.queue.filter((song) => song.id !== data.id) }));
  },
  clearQueue: () => {
    return set({ queue: [] });
  },
}));

export default useQueueStore;
