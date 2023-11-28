import useUserData from '../../../hooks/useUserData';
import { useEffect } from 'react';

import {
  Flex,
  Box,
  InputGroup,
  InputLeftElement,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Avatar,
  Button,
  useDisclosure,
  Text,
  useToast,
} from '@chakra-ui/react';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import { FaSearch } from 'react-icons/fa';
import { CiSettings } from 'react-icons/ci';
import { IoIosLogOut } from 'react-icons/io';
import { AiOutlinePlayCircle } from 'react-icons/ai';
import { MdOutlineFileUpload } from 'react-icons/md';

import LoginModal from '../../../components/common/Modal/LoginModal';
import RegisterModal from '../../../components/common/Modal/RegisterModal';

import requestApi from '../../../utils/api';

export default function Header() {
  const { isOpen: isOpenLogin, onOpen: onOpenLogin, onClose: onCloseLogin } = useDisclosure();
  const { isOpen: isOpenRegiter, onOpen: onOpenRegiter, onClose: onCloseRegiter } = useDisclosure();
  const toast = useToast();

  const accessToken = localStorage.getItem('accessToken');
  const userData = useUserData((state) => state.userData);
  const initUserData = useUserData((state) => state.initUserData);
  const initPlaylistsData = useUserData((state) => state.initPlaylistsData);
  const initSongsData = useUserData((state) => state.initSongsData);
  const initFavoritedSongsData = useUserData((state) => state.initFavoritedSongsData);

  useEffect(() => {
    const fetchUserData = async () => {
      if (accessToken) {
        try {
          const userDataRes = await requestApi('/users/curr/info', 'GET');
          initUserData(userDataRes.data.result);
          initSongsData(userDataRes.data.result.songs);
          initFavoritedSongsData(userDataRes.data.result.favoriteSongs);
        } catch (err) {
          handleLogout();
        }
      }
    };

    const fetchPlaylistsData = async () => {
      if (accessToken) {
        try {
          const playlistsDataRes = await requestApi('/playlists', 'GET');
          initPlaylistsData(playlistsDataRes.data.result);
        } catch (err) {
          handleLogout();
        }
      }
    };

    fetchUserData();
    fetchPlaylistsData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    initUserData({
      id: null,
      first_name: null,
      last_name: null,
      email: null,
      avatar: null,
      role: null,
    });
    toast({
      title: 'Logged out successfully!',
      status: 'success',
      position: 'top-right',
      isClosable: true,
      duration: 2000,
    });
  };

  return (
    <Flex gap={4} px={16} h="full" alignItems="center" bg="layoutBg">
      <Flex color="gray" gap={8}>
        <Box>
          <FaArrowLeft />
        </Box>
        <Box>
          <FaArrowRight />
        </Box>
      </Flex>
      <InputGroup color="white" w="440px">
        <InputLeftElement>
          <FaSearch />
        </InputLeftElement>
        <Input
          color="white"
          borderRadius="full"
          px={4}
          py={2}
          bg="whiteAlpha.400"
          variant="unstyled"
          placeholder="Tìm kiếm nghệ sĩ, bài hát, lời bài hát..."
        />
      </InputGroup>
      <Flex flex={1}></Flex>
      <Menu>
        <MenuButton
          color="white"
          as={IconButton}
          aria-label="Options"
          icon={<CiSettings size="24" />}
          variant="filled"
          bg="whiteAlpha.400"
          rounded="full"
        />
        <MenuList bg="primaryBg" borderColor="primaryBg">
          <MenuItem color="white" bg="primaryBg" icon={<AiOutlinePlayCircle size={20} />}>
            Trình phát nhạc
          </MenuItem>
        </MenuList>
      </Menu>
      {userData.id === null ? (
        <Menu>
          <MenuButton
            color="white"
            as={IconButton}
            aria-label="Options"
            icon={<Avatar size="full" bg="purple.500" src="https://bit.ly/broken-link" />}
            variant="filled"
            bg="whiteAlpha.400"
            rounded="full"
          />
          <MenuList px={4} bg="primaryBg" borderColor="primaryBg">
            <MenuItem color="white" bg="primaryBg">
              <Button
                rounded="full"
                size="md"
                bg={'purplePrimary'}
                color="white"
                w="full"
                _hover={{ bg: 'purple.500' }}
                mx="auto"
                onClick={onOpenLogin}
              >
                Đăng nhập
              </Button>
            </MenuItem>
            <MenuItem color="white" bg="primaryBg">
              <Button
                rounded="full"
                size="md"
                bg={'purple.400'}
                color="white"
                w="full"
                _hover={{ bg: 'purple.500' }}
                mx="auto"
                onClick={onOpenRegiter}
              >
                Đăng ký
              </Button>
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Menu>
          <MenuButton
            color="white"
            as={IconButton}
            aria-label="Options"
            icon={<Avatar size="full" bg="purple.500" src={userData.avatar} />}
            variant="filled"
            bg="whiteAlpha.400"
            rounded="full"
          />
          <MenuList px={4} bg="primaryBg" borderColor="primaryBg">
            <Flex py={4} justifyContent="center" alignItems="center" gap={2}>
              <Avatar bg="purple.500" src={userData.avatar} />
              <Text color="white" fontWeight="bold" fontSize="larger">
                {userData.first_name + ' ' + userData.last_name}
              </Text>
            </Flex>
            <Box my={4} mx={1} borderBottom="1px solid" color="gray.600" />
            <Text mb={4} color="white" fontWeight="bold" fontSize="larger" px={4}>
              Cá Nhân
            </Text>
            <MenuItem color="white" bg="primaryBg" icon={<MdOutlineFileUpload size={20} />}>
              Tải lên
            </MenuItem>
            <MenuItem
              mb={4}
              mt={2}
              onClick={handleLogout}
              color="white"
              bg="primaryBg"
              icon={<IoIosLogOut size={20} />}
            >
              Đăng xuất
            </MenuItem>
          </MenuList>
        </Menu>
      )}
      <LoginModal isOpen={isOpenLogin} onClose={onCloseLogin} />
      <RegisterModal isOpen={isOpenRegiter} onClose={onCloseRegiter} />
    </Flex>
  );
}
