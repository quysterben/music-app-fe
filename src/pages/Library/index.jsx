import {
  Stack,
  HStack,
  Heading,
  Text,
  Button,
  VStack,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  TabIndicator,
} from '@chakra-ui/react';

import { FaPlayCircle } from 'react-icons/fa';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import useUserData from '../../hooks/useUserData';
import PlaylistCard from '../../components/PlaylistCard';
import useQueueStore from '../../hooks/useQueueStore';
import MusicListItem from '../../components/MusicListItem';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useNavigateSideBar from '../../hooks/useNavigateSideBar';

import requestApi from '../../utils/api';

export default function Library() {
  const navigate = useNavigate();
  const setUrl = useNavigateSideBar((state) => state.setUrl);
  const accessToken = localStorage.getItem('accessToken');
  const playlists = useUserData((state) => state.playlists);
  const songs = useUserData((state) => state.songs);
  const favoritedSongs = useUserData((state) => state.favoritedSongs);
  const queue = useQueueStore((state) => state.queue);

  const initPlaylistsData = useUserData((state) => state.initPlaylistsData);
  const initSongsData = useUserData((state) => state.initSongsData);
  const initFavoritedSongsData = useUserData((state) => state.initFavoritedSongsData);

  useEffect(() => {
    const fetchUserData = async () => {
      const userDataRes = await requestApi('/users/curr/info', 'GET');
      initSongsData(userDataRes.data.result.songs);
      initFavoritedSongsData(userDataRes.data.result.favoriteSongs);
    };

    const fetchPlaylistsData = async () => {
      const playlistsDataRes = await requestApi('/playlists', 'GET');
      initPlaylistsData(playlistsDataRes.data.result);
    };

    if (!accessToken) {
      navigate('/');
      setUrl('/');
    } else {
      fetchPlaylistsData();
      fetchUserData();
    }
  }, [accessToken]);

  return (
    <Stack
      w="100%"
      p="0 30px"
      pt="50px"
      bgColor="playerBg"
      gap="50px"
      overflowY="auto"
      maxH={queue.length === 0 ? 'calc(100vh - 60px)' : 'calc(100vh - 140px)'}
      h={queue.length === 0 ? 'calc(100vh - 60px)' : 'calc(100vh - 140px)'}
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
      <HStack alignItems="center">
        <Heading fontSize="42px" mr="10px" color="white">
          Thư viện
        </Heading>
        <FaPlayCircle fontSize="42px" color="white" />
      </HStack>

      <VStack>
        <HStack justify="space-between" w="100%">
          <HStack>
            <Text fontWeight="bold" fontSize="24px" color="white">
              Playlist
            </Text>
            <Button pl="0" bgColor="transparent" _hover={{ bgColor: 'transparent' }}>
              <IoIosAddCircleOutline fontSize="24px" color="white" />
            </Button>
          </HStack>

          <HStack>
            <Text fontSize="12px" color="#bbb">
              TẤT CẢ
            </Text>
            <IoIosArrowForward fontSize="20px" color="#bbb" />
          </HStack>
        </HStack>

        <HStack justifyContent="flex-start" w={'100%'} gap="20px">
          {playlists.length > 0 &&
            playlists.map((playlist, index) => {
              if (index > 5) return;
              return <PlaylistCard key={playlist.id} playlistData={playlist} />;
            })}
        </HStack>
      </VStack>

      <VStack alignItems="flex-start">
        <Text fontWeight="bold" fontSize="24px" color="white">
          Bài Hát
        </Text>

        <Tabs colorScheme="purplePrimary" color="#eee" variant="unstyle" w="100%">
          <TabList borderBottom="0px">
            <Tab color="#eee">Yêu Thích</Tab>
            <Tab color="#eee">Đã tải lên</Tab>
          </TabList>
          <TabIndicator mt="-1.5px" height="2px" bg="purplePrimary" borderRadius="1px" />
          <TabPanels>
            <TabPanel height="300px">
              <VStack gap="5px" w="100%">
                {favoritedSongs.length > 0 &&
                  favoritedSongs.map((song, index) => (
                    <MusicListItem key={index} songData={song} />
                  ))}
              </VStack>
            </TabPanel>
            <TabPanel height="300px">
              <VStack gap="5px" w="100%">
                {songs.length > 0 &&
                  songs.map((song, index) => <MusicListItem key={index} songData={song} />)}
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Stack>
  );
}
