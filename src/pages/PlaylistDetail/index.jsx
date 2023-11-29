/* eslint-disable no-unused-vars */
import { Flex, Button, Stack, Image, Text, VStack, Heading, useToast } from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import useQueueStore from '../../hooks/useQueueStore';
import usePlayerStore from '../../hooks/usePlayerStore';
import { useNavigate, useParams } from 'react-router-dom';

import MusicListItem from '../../components/MusicListItem';

import requestApi from '../../utils/api';
import useUserData from '../../hooks/useUserData';
import useNavigateSideBar from '../../hooks/useNavigateSideBar';

export default function PlaylistDetail() {
  const url = useParams();
  const toast = useToast();
  const navigate = useNavigate();

  const queue = useQueueStore((state) => state.queue);
  const [playlistData, setPlaylistData] = useState(null);
  const [loading, setLoading] = useState(true);

  const userData = useUserData((state) => state.userData);
  const setUrl = useNavigateSideBar((state) => state.setUrl);

  const initQueue = useQueueStore((state) => state.initQueue);
  const setCurruntSong = usePlayerStore((state) => state.setCurruntSong);
  const setCurruntSongIndex = usePlayerStore((state) => state.setCurruntSongIndex);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await requestApi(`/playlists/${url.id}`, 'GET');
        setPlaylistData(res.data.result);
        console.log(res.data.result);
        setLoading(false);
      } catch (err) {
        toast({
          title: 'Lỗi',
          description: err.response.data.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        setUrl('/');
        navigate('/');
      }
    };

    fetchData();
  }, []);

  const handlePlayAll = () => {
    initQueue(playlistData.songs);
    setCurruntSong(playlistData.songs[0]);
    setCurruntSongIndex(0);
  };

  const handleDeletePlaylist = async () => {
    try {
      await requestApi(`/playlists/${url.id}`, 'DELETE');
      navigate('/');
      setUrl('/');
      toast({
        title: 'Xóa playlist thành công',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (err) {
      console.log(err);
    }
  };

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
      {!loading && (
        <Flex mx={10} color="white">
          <VStack spacing={4} w="30%">
            <Image
              boxSize="280"
              src={
                playlistData.thumbnail ||
                'https://res.cloudinary.com/dkdwgdq4i/image/upload/v1701111261/musicapp-nest/images/artworks/vhq0pyc1xyzi10vbn8xq.jpg'
              }
            />
            <Heading fontSize="x-large">{playlistData.name}</Heading>
            <Text>{playlistData.is_public ? 'Công khai' : 'Riêng tư'}</Text>
            <Button
              rounded="full"
              size="md"
              bg={'purplePrimary'}
              color="white"
              w="80%"
              _hover={{ bg: 'purple.500' }}
              mx="auto"
              onClick={handlePlayAll}
            >
              Phát tất cả
            </Button>
            {userData.id === playlistData.user.id && (
              <Button
                rounded="full"
                size="md"
                bg={'whiteAlpha.400'}
                color="white"
                w="80%"
                _hover={{ bg: 'whiteAlpha.600' }}
                mx="auto"
                onClick={handleDeletePlaylist}
              >
                Xóa playlist
              </Button>
            )}
          </VStack>
          <VStack flex={1}>
            {playlistData.songs.map((song, index) => (
              <MusicListItem key={index} songData={song} />
            ))}
          </VStack>
        </Flex>
      )}
    </Stack>
  );
}
