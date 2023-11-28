import React from 'react';
import Proptypes from 'prop-types';
import { HStack, Box, VStack, Text, Image } from '@chakra-ui/react';
import { FcLike } from 'react-icons/fc';

import usePlayerStore from '../../hooks/usePlayerStore';
import useQueueStore from '../../hooks/useQueueStore';
import useUserData from '../../hooks/useUserData';
import requestApi from '../../utils/api';

MusicListItem.propTypes = {
  songData: Proptypes.object.isRequired,
};

function MusicListItem({ songData }) {
  const accessToken = localStorage.getItem('accessToken');

  const addSongToQueue = useQueueStore((state) => state.addSongToQueue);
  const queue = useQueueStore((state) => state.queue);

  const recentSong = useUserData((state) => state.recentSongs);
  const initRecentSongsData = useUserData((state) => state.initRecentSongsData);

  const setCurruntSong = usePlayerStore((state) => state.setCurruntSong);
  const setCurruntSongIndex = usePlayerStore((state) => state.setCurruntSongIndex);

  const setIsPlaying = usePlayerStore((state) => state.setIsPlaying);

  const handleAddSongToQueue = async () => {
    if (accessToken) {
      await requestApi(`/songs/recent/${songData.id}`, 'POST');
      initRecentSongsData([...recentSong, songData]);
    }

    if (queue.length === 0) {
      addSongToQueue(songData);
      setCurruntSong(songData);
      setCurruntSongIndex(0);
      setIsPlaying(true);
    } else {
      const isSongExist = queue.find((song) => song.id === songData.id);
      if (!isSongExist) {
        addSongToQueue(songData);
        setCurruntSong(songData);
        setCurruntSongIndex(queue.length);
        setIsPlaying(true);
      } else {
        setCurruntSong(songData);
        setCurruntSongIndex(queue.findIndex((song) => song.id === songData.id));
        setIsPlaying(true);
      }
    }
  };

  return (
    <HStack
      p="10px 10px"
      borderRadius="10px"
      justifyContent="space-between"
      w="100%"
      _hover={{ cursor: 'pointer', bg: 'primaryBg' }}
      onClick={handleAddSongToQueue}
    >
      <HStack>
        <Box alignSelf="center" overflow="hidden" borderRadius="10px">
          <Image
            h="50px"
            w="50px"
            _hover={{ transform: 'scale(1.1)', cursor: 'pointer' }}
            transition="all linear 0.4s"
            src={songData.artwork}
          />
        </Box>

        <VStack alignItems="flex-start" gap="0">
          <Text fontWeight="bold" color="#eee">
            {songData?.name}
          </Text>
          <Text fontSize="13px" fontWeight="500" color="#aaa">
            {songData?.artist}
          </Text>
        </VStack>
      </HStack>

      <HStack>
        <Box>
          <FcLike color="#fff" />
        </Box>
        <Text>3:55</Text>
      </HStack>
    </HStack>
  );
}

export default MusicListItem;
