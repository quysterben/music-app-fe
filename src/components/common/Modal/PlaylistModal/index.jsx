import Proptypes from 'prop-types';

import { useState } from 'react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  Input,
  useToast,
} from '@chakra-ui/react';

import requestApi from '../../../../utils/api';

PlaylistModal.propTypes = {
  isOpen: Proptypes.bool,
  onClose: Proptypes.func,
};

export default function PlaylistModal({ isOpen, onClose }) {
  const toast = useToast();
  const [playlistName, setPlaylistName] = useState('');

  const handleSubmit = async () => {
    try {
      await requestApi('/playlists', 'POST', { name: playlistName });
      toast({
        title: 'Tạo playlist mới thành công',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
      setPlaylistName('');
      onClose();
    } catch (err) {
      toast({
        title: 'Tạo playlist mới thất bại',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  return (
    <Modal size="xs" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="primaryBg">
        <ModalHeader color="white" fontWeight="bold" mx="auto">
          Tạo playlist mới
        </ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody>
          <VStack spacing="4">
            <Input
              onChange={(e) => setPlaylistName(e.target.value)}
              color="white"
              borderRadius="full"
              px={4}
              py={2}
              bg="whiteAlpha.400"
              variant="unstyled"
              placeholder="Tên playlist"
            />
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            isActive={playlistName === ''}
            isDisabled={playlistName === ''}
            size="md"
            bg={'purplePrimary'}
            color="white"
            rounded="full"
            w="full"
            onClick={handleSubmit}
            _hover={{ bg: 'purple.500' }}
          >
            Tạo mới
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
