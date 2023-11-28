const isFavoriteSong = (song, favoriteSongs) => {
  console.log(song, favoriteSongs);
  if (!favoriteSongs || favoriteSongs.length === 0) {
    return false;
  }
  return favoriteSongs.some((favoriteSong) => favoriteSong.id === song.id);
};

export default isFavoriteSong;
