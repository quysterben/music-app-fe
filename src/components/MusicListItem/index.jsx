import React from 'react';
import Proptypes from 'prop-types';
import { HStack, Box, VStack, Text, Image } from '@chakra-ui/react';
import { FcLike } from 'react-icons/fc';

MusicListItem.propTypes = {
  songData: Proptypes.object.isRequired,
};

function MusicListItem({ songData }) {
  return (
    <HStack
      p="10px 10px"
      borderRadius="10px"
      justifyContent="space-between"
      w="100%"
      _hover={{ cursor: 'pointer', bg: 'primaryBg' }}
    >
      <HStack>
        <Box alignSelf="center" overflow="hidden" borderRadius="10px">
          <Image
            h="50px"
            w="50px"
            _hover={{ transform: 'scale(1.1)', cursor: 'pointer' }}
            transition="all linear 0.4s"
            src="https://res.cloudinary.com/dkdwgdq4i/image/upload/v1701111261/musicapp-nest/images/artworks/vhq0pyc1xyzi10vbn8xq.jpg"
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
