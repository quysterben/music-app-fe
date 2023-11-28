import Proptypes from 'prop-types';

import usePlayerStore from '../../hooks/usePlayerStore';

import { Flex, Image, Text } from '@chakra-ui/react';

MusicQueueCard.propTypes = {
  musicData: Proptypes.object.isRequired,
  currentSong: Proptypes.object.isRequired,
  musicDataIndex: Proptypes.number.isRequired,
};

export default function MusicQueueCard({ musicData, currentSong, musicDataIndex }) {
  const setCurruntSong = usePlayerStore((state) => state.setCurruntSong);
  const setIsPlaying = usePlayerStore((state) => state.setIsPlaying);
  const setCurruntSongIndex = usePlayerStore((state) => state.setCurruntSongIndex);

  return (
    <Flex
      rounded="md"
      alignItems="center"
      gap={4}
      px={4}
      py={2}
      onClick={() => {
        setCurruntSong(musicData);
        setCurruntSongIndex(musicDataIndex);
        setIsPlaying(true);
      }}
      cursor="pointer"
      bgColor={musicData.id === currentSong.id && 'purplePrimary'}
      w="full"
      _hover={musicData.id !== currentSong.id && { bg: 'whiteAlpha.400' }}
    >
      <Image rounded="md" boxSize="12" src={musicData.artwork} alt="..." />
      <Flex flexDir="column">
        <Text fontSize="md" fontWeight="bold">
          {musicData.name}
        </Text>
        <Text mb={2} color="whiteAlpha.600">
          {musicData.artist}
        </Text>
      </Flex>
    </Flex>
  );
}
