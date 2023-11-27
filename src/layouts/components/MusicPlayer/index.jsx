import useQueueStore from '../../../hooks/useQueueStore';

import { Flex } from '@chakra-ui/react';

export default function MusicPlayer() {
  const queue = useQueueStore((state) => state.queue);

  return (
    queue.length > 0 && (
      <Flex h="full" w="100vw" alignItems="center" bgColor="playerBg" zIndex="overlay">
        Player
      </Flex>
    )
  );
}
