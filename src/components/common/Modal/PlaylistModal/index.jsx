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
  Flex,
  Text,
  Switch,
} from '@chakra-ui/react';

PlaylistModal.propTypes = {
  isOpen: Proptypes.bool,
  onClose: Proptypes.func,
};

export default function PlaylistModal({ isOpen, onClose }) {
  const [playlistName, setPlaylistName] = useState('');

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
              <Switch colorScheme="purple" size="md" />
            </Flex>
            <Flex justify="space-between" w="full" gap={2} alignItems="center">
              <Flex flexDir="column" color={'white'}>
                <Text>Phát ngẫu nhiên</Text>
                <Text fontSize="xs" color="gray">
                  Luôn phát ngẫu nhiên tất cả bài hát
                </Text>
              </Flex>
              <Switch colorScheme="purple" size="md" />
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
            _hover={{ bg: 'purple.500' }}
          >
            Tạo mới
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
