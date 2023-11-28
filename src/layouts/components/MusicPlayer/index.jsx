/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import usePlayerStore from '../../../hooks/usePlayerStore';
import useQueueStore from '../../../hooks/useQueueStore';

import {
  Image,
  Flex,
  Text,
  Box,
  Slider,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  VStack,
} from '@chakra-ui/react';
import { FaRegHeart, FaRandom, FaStepBackward, FaStepForward, FaVolumeUp } from 'react-icons/fa';
import { PiPlaylistBold } from 'react-icons/pi';
import { TbRepeatOnce, TbRepeat } from 'react-icons/tb';
import { MdGraphicEq, MdPauseCircleOutline, MdPlayCircleOutline } from 'react-icons/md';
import MusicQueueCard from '../../../components/MusicQueueCard';

export default function MusicPlayer() {
  const queue = useQueueStore((state) => state.queue);

  const curruntSong = usePlayerStore((state) => state.curruntSong);
  const setCurrentSong = usePlayerStore((state) => state.setCurruntSong);

  const currentSongIndex = usePlayerStore((state) => state.curruntSongIndex);
  const setCurrentSongIndex = usePlayerStore((state) => state.setCurruntSongIndex);

  const audioRef = useRef();
  const currentTimeRef = useRef();
  // playing state
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const setIsPlaying = usePlayerStore((state) => state.setIsPlaying);

  const isRepeat = usePlayerStore((state) => state.isRepeat);
  const setIsRepeat = usePlayerStore((state) => state.setIsRepeat);

  const volume = usePlayerStore((state) => state.volume);
  const setVolume = usePlayerStore((state) => state.setVolume);

  const currentTime = usePlayerStore((state) => state.currentTime);
  const setCurrentTime = usePlayerStore((state) => state.setCurrentTime);

  useEffect(() => {
    const playPromise = audioRef.current.play();
    playPromise.then(() => {}).catch((err) => {});
  }, [curruntSong, currentSongIndex]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  const handleNextSong = () => {
    if (currentSongIndex === queue.length - 1) {
      setCurrentSong(queue[0]);
      setCurrentSongIndex(0);
      setIsPlaying(true);
      audioRef.current.play();
      return;
    }
    setCurrentSong(queue[currentSongIndex + 1]);
    setCurrentSongIndex(currentSongIndex + 1);
    setIsPlaying(true);
    audioRef.current.play();
  };

  const handleBackSong = () => {
    if (currentSongIndex === 0) {
      setCurrentSong(queue[queue.length - 1]);
      setCurrentSongIndex(queue.length - 1);
      setIsPlaying(true);
      audioRef.current.play();
      return;
    }
    setCurrentSong(queue[currentSongIndex - 1]);
    setCurrentSongIndex(currentSongIndex - 1);
    setIsPlaying(true);
    audioRef.current.play();
  };

  // Handle open playlist drawer
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const getTimeDuration = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    if (seconds < 10) return `${minutes}:0${seconds}`;
    return `${minutes}:${seconds}`;
  };

  const getPlayingProcess = (currentTime) => {
    return (currentTime / curruntSong.duration) * 100;
  };

  return (
    queue.length > 0 && (
      <Flex
        justify="space-between"
        h="full"
        w="100vw"
        alignItems="center"
        bgColor="playerBg"
        zIndex="overlay"
      >
        <Flex justifyContent="center" alignItems="center" gap={4} px={12}>
          <Image boxSize="14" rounded="md" src={curruntSong.artwork} alt="..." />
          <Flex color="white" flexDir="column">
            <Text fontSize="md" fontWeight="bold">
              {curruntSong.name}
            </Text>
            <Text mb={2} color="whiteAlpha.600">
              {curruntSong.artist}
            </Text>
          </Flex>
          <Flex mx={4}>
            <FaRegHeart size="16" color="white" />
          </Flex>
        </Flex>
        <Flex flex={1} flexDir="column" justifyContent="center" alignItems="center" gap={0} px={12}>
          <Flex gap={2} justifyContent="center" alignItems="center">
            <Flex p={2} cursor="pointer" rounded="full" _hover={{ bgColor: 'whiteAlpha.400' }}>
              <FaRandom size="16" color="white" />
            </Flex>
            <Flex
              p={2}
              onClick={handleBackSong}
              cursor="pointer"
              rounded="full"
              _hover={{ bgColor: 'whiteAlpha.400' }}
            >
              <FaStepBackward size="16" color="white" />
            </Flex>
            <Flex
              onClick={() => setIsPlaying(!isPlaying)}
              p={2}
              cursor="pointer"
              rounded="full"
              _hover={{ bgColor: 'whiteAlpha.400' }}
            >
              {isPlaying ? (
                <MdPauseCircleOutline size="32" color="white" />
              ) : (
                <MdPlayCircleOutline size="32" color="white" />
              )}
            </Flex>
            <Flex
              p={2}
              onClick={handleNextSong}
              cursor="pointer"
              rounded="full"
              _hover={{ bgColor: 'whiteAlpha.400' }}
            >
              <FaStepForward size="16" color="white" />
            </Flex>
            <Flex p={2} cursor="pointer" rounded="full" _hover={{ bgColor: 'whiteAlpha.400' }}>
              {isRepeat === 0 ? (
                <TbRepeat size="16" color="white" onClick={() => setIsRepeat(1)} />
              ) : isRepeat === 1 ? (
                <Flex color="purplePrimary">
                  <TbRepeat size="16" onClick={() => setIsRepeat(2)} />
                </Flex>
              ) : (
                <Flex color="purplePrimary">
                  <TbRepeatOnce size="16" onClick={() => setIsRepeat(0)} />
                </Flex>
              )}
            </Flex>
          </Flex>
          <Flex gap={2} w="50%">
            <Text ref={currentTimeRef} color="whiteAlpha.600" fontSize="xs" />
            <Slider
              onChange={(e) => (audioRef.current.currentTime = curruntSong.duration * (e / 100))}
              aria-label="slider-ex-4"
              defaultValue={0}
              value={getPlayingProcess(currentTime)}
            >
              <SliderTrack bg="whiteAlpha.400">
                <SliderFilledTrack bg="whiteAlpha.900" />
              </SliderTrack>
              <SliderThumb boxSize={2}>
                <Box color="whiteAlpha.900" as={MdGraphicEq} />
              </SliderThumb>
            </Slider>
            <audio
              onEnded={() => {
                if (isRepeat === 2) {
                  audioRef.current.currentTime = 0;
                  setIsPlaying(true);
                  audioRef.current.play();
                  return;
                }
                if (queue.length === 1) {
                  audioRef.current.currentTime = 0;
                  setIsPlaying(false);
                  audioRef.current.pause();
                  return;
                }
                if (currentSongIndex === queue.length - 1) {
                  setCurrentSong(queue[0]);
                  setCurrentSongIndex(0);
                  if (isRepeat === 1) return;
                  setIsPlaying(false);
                  audioRef.current.pause();
                  return;
                }
                setCurrentSong(queue[currentSongIndex + 1]);
                setCurrentSongIndex(currentSongIndex + 1);
              }}
              onTimeUpdate={() => {
                currentTimeRef.current.innerText = getTimeDuration(audioRef.current.currentTime);
                setCurrentTime(audioRef.current.currentTime);
              }}
              ref={audioRef}
              src={curruntSong.url}
            />
            <Text color="whiteAlpha.600" fontSize="xs">
              {getTimeDuration(curruntSong.duration)}
            </Text>
          </Flex>
        </Flex>
        <Flex w="20%" justifyContent="center" alignItems="center" gap={4} px={12}>
          <Flex w="full" gap={4}>
            <FaVolumeUp size="16" color="white" />
            <Slider
              onChange={(e) => setVolume(e / 100)}
              w={16}
              aria-label="slider-ex-2"
              value={volume * 100}
            >
              <SliderTrack bg="whiteAlpha.400">
                <SliderFilledTrack bg="whiteAlpha.900" />
              </SliderTrack>
              <SliderThumb boxSize={2}>
                <Box color="whiteAlpha.900" as={MdGraphicEq} />
              </SliderThumb>
            </Slider>
          </Flex>
          <Flex
            onClick={onOpen}
            p={2}
            cursor="pointer"
            rounded="full"
            _hover={{ bgColor: 'whiteAlpha.400' }}
          >
            <PiPlaylistBold size={16} color="white" />
          </Flex>
        </Flex>

        <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
          <DrawerContent color="white" bgColor="drawerBg">
            <DrawerHeader>
              <Flex justify="space-between" alignItems="center">
                <Text fontSize="md" fontWeight="bold">
                  Danh sách phát
                </Text>
                <Flex p={2} cursor="pointer" rounded="full" _hover={{ bgColor: 'whiteAlpha.400' }}>
                  <PiPlaylistBold size={16} color="white" />
                </Flex>
              </Flex>
            </DrawerHeader>
            <DrawerBody
              overflowY="auto"
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
              <VStack w="full">
                {queue.map((song, index) => (
                  <MusicQueueCard
                    key={song.id}
                    musicDataIndex={index}
                    musicData={song}
                    currentSong={curruntSong}
                  />
                ))}
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    )
  );
}
