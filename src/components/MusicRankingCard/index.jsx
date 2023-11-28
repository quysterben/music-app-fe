/* eslint-disable no-unused-vars */
import Proptypes from 'prop-types';
import { HStack, Box, VStack, Text, Image, Heading, Flex } from '@chakra-ui/react';
import { FaRegHeart } from 'react-icons/fa';

import usePlayerStore from '../../hooks/usePlayerStore';
import useQueueStore from '../../hooks/useQueueStore';
import useUserData from '../../hooks/useUserData';
import requestApi from '../../utils/api';
import isFavoriteSong from '../../helpers/isFavouriteSong';

MusicRankingCard.propTypes = {
  songData: Proptypes.object.isRequired,
  rank: Proptypes.number.isRequired,
};

function MusicRankingCard({ songData, rank }) {
  const accessToken = localStorage.getItem('accessToken');

  const favoritedSongs = useUserData((state) => state.favoritedSongs);

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

  const initFavoritedSongsData = useUserData((state) => state.initFavoritedSongsData);

  const handleFavoriteSong = async () => {
    try {
      const res = await requestApi(`/songs/favorite/${songData.id}`, 'GET');
      initFavoritedSongsData(res.data.result.response.favoriteSongs);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <HStack
      color="white"
      p="10px 10px"
      borderRadius="10px"
      justifyContent="space-between"
      w="100%"
      _hover={{ cursor: 'pointer', bg: 'primaryBg' }}
    >
      <HStack flex={1} onClick={handleAddSongToQueue}>
        <Box mx={10}>
          <Heading fontSize="40" fontWeight="bold" color="#eee">
            {rank}
          </Heading>
        </Box>

        <Box alignSelf="center" overflow="hidden" borderRadius="10px">
          <Image
            h="50px"
            w="50px"
            _hover={{ transform: 'scale(1.1)', cursor: 'pointer' }}
            transition="all linear 0.4s"
            src={songData.artwork}
          />
        </Box>

        <VStack ml={2} alignItems="flex-start" gap="0">
          <Text fontWeight="bold" color="#eee">
            {songData?.name}
          </Text>
          <Text fontSize="13px" fontWeight="500" color="#aaa">
            {songData?.artist}
          </Text>
        </VStack>
      </HStack>

      <HStack>
        <Flex
          mx={4}
          onClick={handleFavoriteSong}
          color={isFavoriteSong(songData, favoritedSongs) ? 'purplePrimary' : 'whiteAlpha.600'}
        >
          <FaRegHeart size="16" />
        </Flex>
        <Text>3:55</Text>
      </HStack>
    </HStack>
  );
}

export default MusicRankingCard;
