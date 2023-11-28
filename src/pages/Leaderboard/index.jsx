/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';

import { Heading, Stack, VStack } from '@chakra-ui/react';
import useQueueStore from '../../hooks/useQueueStore';

import requestApi from '../../utils/api';
import MusicRankingCard from '../../components/MusicRankingCard';

export default function LeaderBoard() {
  const queue = useQueueStore((state) => state.queue);

  const [loading, setLoading] = useState(true);
  const [top10Songs, setTop10Songs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await requestApi('/songs?top10=true', 'GET');
      setTop10Songs(response.data.result);
      setLoading(false);
    };

    fetchData();
  }, []);

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
      <Heading color="white">Bảng xếp hạng</Heading>
      <VStack w="full" spacing={4}>
        {!loading &&
          top10Songs.map((song, index) => (
            <MusicRankingCard key={song.id} songData={song} rank={index + 1} />
          ))}
      </VStack>
    </Stack>
  );
}
