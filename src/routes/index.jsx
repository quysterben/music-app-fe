import Discover from '../pages/Discover';
import LeaderBoard from '../pages/Leaderboard';
import Library from '../pages/Library';
import NewSongs from '../pages/NewSongs';

const publicRoutes = [
  { path: '/', component: Discover },
  { path: '/zing-chart', component: LeaderBoard },
  { path: '/mymusic', component: Library },
  { path: '/moi-phat-hanh', component: NewSongs },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
