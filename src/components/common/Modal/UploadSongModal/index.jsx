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
  Text,
} from '@chakra-ui/react';

import requestApi from '../../../../utils/api';

UploadSongModal.propTypes = {
  isOpen: Proptypes.bool,
  onClose: Proptypes.func,
};

export default function UploadSongModal({ isOpen, onClose }) {
  const toast = useToast();
  const [songName, setSongName] = useState('');
  const [songArtist, setSongArtist] = useState('');
  const [songData, setSongData] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!songData || !imageData) {
      toast({
        title: 'Vui lòng chọn file bài hát và ảnh đại diện',
        status: 'error',
        position: 'top-right',
        isClosable: true,
        duration: 2000,
      });
      return;
    } else if (songName === '' || songArtist === '') {
      toast({
        title: 'Vui lòng nhập tên bài hát',
        status: 'error',
        position: 'top-right',
        isClosable: true,
        duration: 2000,
      });
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('artwork', imageData);
      const resArtwork = await requestApi('/songs/upload-art', 'POST', formData);
      const imageUrl = resArtwork.data.result;
      const musicFormData = new FormData();
      musicFormData.append('song', songData);
      const resMusic = await requestApi('/songs/upload-audio', 'POST', musicFormData);
      const musicUrl = resMusic.data.result.url;
      const musicDuration = Math.round(resMusic.data.result.duration);
      const res = await requestApi('/songs', 'POST', {
        name: songName,
        artwork: imageUrl,
        url: musicUrl,
        artist: songArtist,
        duration: musicDuration,
      });
      toast({
        title: 'Tải lên thành công',
        status: 'success',
        position: 'top-right',
        isClosable: true,
        duration: 2000,
      });
      setLoading(false);
      onClose();
    } catch (err) {
      toast({
        title: err.message,
        status: 'error',
        position: 'top-right',
        isClosable: true,
        duration: 2000,
      });
    }
  };

  return (
    <Modal size="md" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="primaryBg">
        <ModalHeader color="white" fontWeight="bold" mx="auto">
          Tải bài hát mới
        </ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody>
          <VStack spacing="4">
            <Input
              onChange={(e) => setSongName(e.target.value)}
              color="white"
              borderRadius="full"
              px={4}
              py={2}
              bg="whiteAlpha.400"
              variant="unstyled"
              placeholder="Tên bài hát"
            />
            <Input
              onChange={(e) => setSongArtist(e.target.value)}
              color="white"
              borderRadius="full"
              px={4}
              py={2}
              bg="whiteAlpha.400"
              variant="unstyled"
              placeholder="Nghệ sĩ"
            />
            <Text color="white">Chọn file bài hát (mp3, wav, flac, ...)</Text>
            <Input
              onChange={(e) => setSongData(e.target.files[0])}
              color="white"
              borderRadius="full"
              type="file"
              px={4}
              py={2}
              accept=".mp3,audio/*"
              bg="whiteAlpha.400"
              variant="unstyled"
            />
            <Text color="white">Chọn file ảnh đại diện (png, jpg, ...)</Text>
            <Input
              onChange={(e) => setImageData(e.target.files[0])}
              color="white"
              borderRadius="full"
              type="file"
              px={4}
              py={2}
              accept="image/png, image/gif, image/jpeg"
              bg="whiteAlpha.400"
              variant="unstyled"
            />
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            isLoading={loading}
            isActive={songName === ''}
            isDisabled={songName === ''}
            size="md"
            bg={'purplePrimary'}
            color="white"
            rounded="full"
            w="full"
            onClick={handleSubmit}
            _hover={{ bg: 'purple.500' }}
          >
            Tải lên
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
