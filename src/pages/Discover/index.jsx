import { useEffect, useState } from 'react';
import useQueueStore from '../../hooks/useQueueStore';
import useUserData from '../../hooks/useUserData';

import { Flex, Image, Text, Heading, SimpleGrid } from '@chakra-ui/react';
import Carousel from 'better-react-carousel';

import requestApi from '../../utils/api';
import MusicCard from '../../components/MusicCard';

const Image_URLS = [
  'https://photo-zmp3.zmdcdn.me/banner/c/6/7/4/c674baf04c83b75e907353166f77bd5b.jpg',
  'https://photo-zmp3.zmdcdn.me/banner/6/6/4/5/6645a50abde04b4501812379548d392f.jpg',
  'https://photo-zmp3.zmdcdn.me/banner/c/c/6/6/cc66fbb2d8dfc12e2210239ed9a6a448.jpg',
  'https://photo-zmp3.zmdcdn.me/banner/1/4/a/6/14a6bc4408e442dc2a892e1d4a189887.jpg',
  'https://photo-zmp3.zmdcdn.me/banner/e/2/9/1/e2917910851c112d22209b2aa8d6e9a9.jpg',
  'https://photo-zmp3.zmdcdn.me/banner/b/0/f/a/b0fa9fbfce103d1dce15d73aaceb68be.jpg',
  'https://photo-zmp3.zmdcdn.me/banner/0/a/4/1/0a417c2e9a463131c8d70465e357770b.jpg',
  'https://photo-zmp3.zmdcdn.me/banner/5/6/f/4/56f4435fafc4c88d278759de7ca28506.jpg',
  'https://photo-zmp3.zmdcdn.me/banner/1/4/a/6/14a6bc4408e442dc2a892e1d4a189887.jpg',
];

export default function Discover() {
  const accessToken = localStorage.getItem('accessToken');

  const [loading, setLoading] = useState(true);
  const [songs, setSongs] = useState([]);
  const recentSongs = useUserData((state) => state.recentSongs);
  const initRecentSongsData = useUserData((state) => state.initRecentSongsData);

  useEffect(() => {
    const fetchData = async () => {
      const response = await requestApi('/songs', 'GET');
      setSongs(response.data.result);
      if (accessToken) {
        const recentSongRes = await requestApi('/songs/user/recent', 'GET');
        initRecentSongsData(recentSongRes.data.result);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const queue = useQueueStore((state) => state.queue);

  return (
    <Flex
      px={4}
      overflowY="auto"
      gap={4}
      maxH={queue.length === 0 ? 'calc(100vh - 60px)' : 'calc(100vh - 140px)'}
      color="white"
      flexDir="column"
      bgColor="layoutBg"
      css={{
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#B2BEB5',
          borderRadius: '24px',
        },
      }}
    >
      <Carousel autoplay={4000} hideArrow="true" cols={3} rows={1} gap={10} loop>
        {Image_URLS.map((url, index) => (
          <Carousel.Item key={index}>
            <Image mx="auto" src={url} />
          </Carousel.Item>
        ))}
      </Carousel>
      <Heading ml={8} mt={4} fontSize="xl" fontWeight="bold">
        Gần đây
      </Heading>
      <SimpleGrid columns={3} ml={8}>
        {!loading && recentSongs.length === 0
          ? queue
              .slice(0, 3)
              .toReversed()
              .map((song) => <MusicCard key={song.id} musicData={song} />)
          : recentSongs.slice(0, 3).map((song) => <MusicCard key={song.id} musicData={song} />)}
      </SimpleGrid>
      <Text color="gray.600" fontWeight="xs" ml={8}>
        Bắt đầu nghe từ một bài hát
      </Text>
      <Heading ml={8} mb={40} fontSize="xl" fontWeight="bold">
        Gợi Ý Dành Riêng Cho Bạn
      </Heading>
      <Heading ml={8} mb={40} fontSize="xl" fontWeight="bold">
        Mới phát hành
      </Heading>
      <Heading ml={8} mb={40} fontSize="xl" fontWeight="bold">
        Gợi ý playlist
      </Heading>
      <Heading ml={8} fontSize="xl" fontWeight="bold">
        Tất cả bài hát
      </Heading>
      <SimpleGrid columns={3} ml={8}>
        {!loading && songs.map((song) => <MusicCard key={song.id} musicData={song} />)}
      </SimpleGrid>
    </Flex>
  );
}
