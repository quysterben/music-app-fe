import { create } from 'zustand';

const useUserData = create((set) => ({
  userData: {
    id: null,
    first_name: null,
    last_name: null,
    email: null,
    avatar: null,
    role: null,
  },
  playlists: [],
  songs: [],
  favoritedSongs: [],
  initUserData: (data) => {
    console.log(data);
    const newData = {
      id: data.id,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      avatar: data.avatar,
      role: data.role,
    };
    return set({ userData: newData });
  },
  initPlaylistsData: (data) => {
    return set({ playlists: data });
  },
  initSongsData: (data) => {
    return set({ songs: data });
  },
  initFavoritedSongsData: (data) => {
    return set({ favoritedSongs: data });
  },
}));

export default useUserData;
