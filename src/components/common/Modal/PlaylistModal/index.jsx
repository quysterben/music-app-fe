/* eslint-disable no-unused-vars */
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
  Flex,
  Text,
  Switch,
} from '@chakra-ui/react';

import requestApi from '../../../../utils/api';
import useUserData from '../../../../hooks/useUserData';

PlaylistModal.propTypes = {
  isOpen: Proptypes.bool,
  onClose: Proptypes.func,
};

export default function PlaylistModal({ isOpen, onClose }) {
  const toast = useToast();
  const [playlistName, setPlaylistName] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const playlists = useUserData((state) => state.playlists);
  const setPlaylists = useUserData((state) => state.initPlaylistsData);

  const handleSubmit = async () => {
    try {
      const res = await requestApi('/playlists', 'POST', {
        name: playlistName,
        isPublic: isPublic,
      });
      toast({
        title: 'Tạo playlist mới thành công',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
      setPlaylistName('');
      setPlaylists([...playlists, res.data.result]);
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
            <Flex justify="space-between" w="full" gap={2} alignItems="center">
              <Flex flexDir="column" color={'white'}>
                <Text>Công khai</Text>
                <Text fontSize="xs" color="gray">
                  Mọi người có thể nhìn thấy playlist này
                </Text>
              </Flex>
              <Switch onChange={() => setIsPublic(true)} colorScheme="purple" size="md" />
            </Flex>
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
