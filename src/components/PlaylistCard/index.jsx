import React from 'react';
import Proptypes from 'prop-types';

import { Stack, Box, Text, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

PlaylistCard.propTypes = {
  playlistData: Proptypes.object.isRequired,
};

function PlaylistCard({ playlistData }) {
  const navigate = useNavigate();

  return (
    <Stack p="10px 0px" onClick={() => navigate(`/playlists/${playlistData.id}`)}>
      <Box alignSelf="center" overflow="hidden" borderRadius="10px">
        <Image
          h="200px"
          w="200px"
          _hover={{ transform: 'scale(1.1)', cursor: 'pointer' }}
          transition="all linear 0.4s"
          src="https://res.cloudinary.com/dkdwgdq4i/image/upload/v1701111261/musicapp-nest/images/artworks/vhq0pyc1xyzi10vbn8xq.jpg"
        />
      </Box>

      <Box>
        <Text fontWeight="bold" color="#eee">
          {playlistData?.name}
        </Text>
        <Text fontSize="13px" fontWeight="500" color="#aaa">
          {playlistData?.user.first_name} {playlistData?.user.last_name}
        </Text>
      </Box>
    </Stack>
  );
}

export default PlaylistCard;
