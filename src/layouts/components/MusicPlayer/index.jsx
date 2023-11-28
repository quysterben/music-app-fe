/* eslint-disable no-unused-vars */
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
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { FaRegHeart, FaRandom, FaStepBackward, FaStepForward, FaVolumeUp } from 'react-icons/fa';
import { RxLoop } from 'react-icons/rx';
import { MdGraphicEq, MdPauseCircleOutline, MdPlayCircleOutline } from 'react-icons/md';

export default function MusicPlayer() {
  const queue = useQueueStore((state) => state.queue);
  const curruntSong = usePlayerStore((state) => state.curruntSong);

  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.load();
    const playPromise = audioRef.current.play();
    playPromise.then(() => {}).catch((err) => {});
    audioRef.current.addEventListener('timeupdate', () => {
      if (currentTime === curruntSong.duration) {
        setIsPlaying(false);
      }
      setCurrentTime(audioRef.current.currentTime);
    });
    setIsPlaying(true);
  }, []);

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

  const getTimeDuration = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    if (seconds < 10) return `${minutes}:0${seconds}`;
    return `${minutes}:${seconds}`;
  };

  const getPlayingProcess = () => {
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
            <Flex p={2} cursor="pointer" rounded="full" _hover={{ bgColor: 'whiteAlpha.400' }}>
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
            <Flex p={2} cursor="pointer" rounded="full" _hover={{ bgColor: 'whiteAlpha.400' }}>
              <FaStepForward size="16" color="white" />
            </Flex>
            <Flex p={2} cursor="pointer" rounded="full" _hover={{ bgColor: 'whiteAlpha.400' }}>
              <RxLoop size="16" color="white" />
            </Flex>
          </Flex>
          <Flex gap={2} w="50%">
            <Text color="whiteAlpha.600" fontSize="xs">
              {getTimeDuration(currentTime)}
            </Text>
            <Slider
              onChange={(e) => (audioRef.current.currentTime = curruntSong.duration * (e / 100))}
              aria-label="slider-ex-4"
              value={getPlayingProcess()}
            >
              <SliderTrack bg="whiteAlpha.400">
                <SliderFilledTrack bg="whiteAlpha.900" />
              </SliderTrack>
              <SliderThumb boxSize={2}>
                <Box color="whiteAlpha.900" as={MdGraphicEq} />
              </SliderThumb>
            </Slider>
            <audio ref={audioRef} src={curruntSong.url} />
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
        </Flex>
      </Flex>
    )
  );
}
