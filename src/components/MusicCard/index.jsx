import Proptypes from 'prop-types';

import usePlayerStore from '../../hooks/usePlayerStore';
import useQueueStore from '../../hooks/useQueueStore';

import { Flex, Text, Image } from '@chakra-ui/react';
import timeFromNow from '../../helpers/getTimeFromNow';

MusicCard.propTypes = {
  musicData: Proptypes.object.isRequired,
};

export default function MusicCard({ musicData }) {
  const addSongToQueue = useQueueStore((state) => state.addSongToQueue);
  const queue = useQueueStore((state) => state.queue);

  const setCurruntSong = usePlayerStore((state) => state.setCurruntSong);
  const setCurruntSongIndex = usePlayerStore((state) => state.setCurruntSongIndex);

  const setIsPlaying = usePlayerStore((state) => state.setIsPlaying);

  const handleAddSongToQueue = () => {
    if (queue.length === 0) {
      addSongToQueue(musicData);
      setCurruntSong(musicData);
      setCurruntSongIndex(0);
      setIsPlaying(true);
    } else {
      const isSongExist = queue.find((song) => song.id === musicData.id);
      if (!isSongExist) {
        addSongToQueue(musicData);
        setCurruntSong(musicData);
        setCurruntSongIndex(queue.length);
        setIsPlaying(true);
      } else {
        setCurruntSong(musicData);
        setCurruntSongIndex(queue.findIndex((song) => song.id === musicData.id));
        setIsPlaying(true);
      }
    }
  };

  return (
    <Flex
      onClick={handleAddSongToQueue}
      rounded="md"
      gap={4}
      cursor="pointer"
      w="full"
      p={4}
      _hover={{ bg: 'whiteAlpha.400' }}
    >
      <Image rounded="md" boxSize="100" src={musicData.artwork} alt="..." />
      <Flex flexDir="column">
        <Text fontSize="xl" fontWeight="bold">
          {musicData.name}
        </Text>
        <Text mb={2} color="whiteAlpha.600">
          {musicData.artist}
        </Text>
        <Text fontSize="xs" color="whiteAlpha.600">
          {timeFromNow(musicData.created_at)}
        </Text>
      </Flex>
    </Flex>
  );
}
