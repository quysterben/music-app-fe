import Discover from '../pages/Discover';
import LeaderBoard from '../pages/Leaderboard';
import Library from '../pages/Library';
import NewSongs from '../pages/NewSongs';
import PlaylistDetail from '../pages/PlaylistDetail';

const publicRoutes = [
  { path: '/', component: Discover },
  { path: '/zing-chart', component: LeaderBoard },
  { path: '/mymusic', component: Library },
  { path: '/moi-phat-hanh', component: NewSongs },
  { path: '/playlists/:id', component: PlaylistDetail },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
