import { useNavigate } from 'react-router-dom';

import {
  Box,
  Flex,
  Grid,
  Image,
  VStack,
  useToast,
  GridItem,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

const logoUrl = 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg';
import customIcon from '../../../assets/Icons';
import { FaPlus } from 'react-icons/fa';

import showNotSupport from '../../../helpers/showNotSupport';

import useNavigateSideBar from '../../../hooks/useNavigateSideBar';
import PlaylistModal from '../../../components/common/Modal/PlaylistModal';

const TabList1 = [
  {
    Text: 'Khám Phá',
    url: '/',
    icon: customIcon.IconKhampha,
  },
  {
    Text: 'BXH',
    url: '/zing-chart',
    icon: customIcon.IconZingchart,
  },
  {
    Text: 'Radio',
    url: '/radio',
    icon: customIcon.RadioIcon,
    notSupport: true,
  },
  {
    Text: 'Thư Viện',
    url: '/mymusic',
    icon: customIcon.IconLibrary,
  },
];

const TabList2 = [
  {
    Text: 'BXH Nhạc Mới',
    url: '/moi-phat-hanh',
    icon: customIcon.IconMusic,
  },
  {
    Text: 'Chủ Đề Và Thể Loại',
    url: '/chu-de-va-the-loai',
    notSupport: true,
    icon: customIcon.IconChuDe,
  },
  {
    Text: 'Top 100',
    url: '/top-100',
    notSupport: true,
    icon: customIcon.IconTop100,
  },
  {
    Text: 'Nghe gần đây',
    url: '/nghe-gan-day',
    notSupport: true,
    icon: customIcon.IconRecently,
  },
  {
    Text: 'Bài hát yêu thích',
    url: '/bai-hat-yeu-thich',
    notSupport: true,
    icon: customIcon.IconLove,
  },
  {
    Text: 'Playlist',
    url: '/playlist',
    notSupport: true,
    icon: customIcon.IconPlaylist,
  },
  {
    Text: 'Đã tải lên',
    url: '/da-tai-len',
    notSupport: true,
    icon: customIcon.IconUpload,
  },
];

export default function SideBar() {
  const navigate = useNavigate();
  const toast = useToast();

  const navigateUrl = useNavigateSideBar((state) => state.url);
  const setNavigateUrl = useNavigateSideBar((state) => state.setUrl);
  const handleNavigate = (path) => {
    navigate(path);
    setNavigateUrl(path);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Grid
      templateAreas={`"logo"
                    "tabList1"
                    "tabList2"
                    "footer"`}
      gridTemplateRows={'60px 220px 1fr 60px'}
      bg="layoutBg"
      h="full"
    >
      <GridItem area={'logo'}>
        <Box my={4} mb={4} area="logo">
          <Image ml={6} w={28} src={logoUrl} alt="logo" />
        </Box>
      </GridItem>
      <GridItem area={'tabList1'}>
        <VStack spacing={0} align="start">
          {TabList1.map((item, index) => {
            if (item.notSupport)
              return (
                <Flex
                  key={index}
                  onClick={() => showNotSupport(toast)}
                  sx={styles.normalStyleTabList}
                >
                  <item.icon />
                  {item.Text}
                </Flex>
              );
            return (
              <Flex
                key={index}
                onClick={() => handleNavigate(item.url)}
                sx={navigateUrl === item.url ? styles.onSelectedTabList : styles.normalStyleTabList}
              >
                <item.icon />
                {item.Text}
              </Flex>
            );
          })}
        </VStack>
        <Box my={4} mx={4} borderBottom="1px solid" color="gray.700" />
      </GridItem>
      <GridItem
        area={'tabList2'}
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
        <VStack spacing={0} align="start">
          {TabList2.map((item, index) => {
            if (item.notSupport)
              return (
                <Flex
                  key={index}
                  onClick={() => showNotSupport(toast)}
                  sx={styles.normalStyleTabList}
                >
                  <item.icon />
                  {item.Text}
                </Flex>
              );
            return (
              <Flex
                key={index}
                onClick={() => handleNavigate(item.url)}
                sx={navigateUrl === item.url ? styles.onSelectedTabList : styles.normalStyleTabList}
              >
                <item.icon />
                {item.Text}
              </Flex>
            );
          })}
        </VStack>
      </GridItem>
      <GridItem cursor="pointer" area={'footer'}>
        <Flex h="full" justifyContent="center" alignItems="center" area="footer" flexDir="column">
          <Box w="full" borderBottom="1px solid" color="gray.700" />
          <Flex
            gap={2}
            alignItems="center"
            justifyContent="center"
            py={4}
            color="white"
            fontSize="revert-layer"
            onClick={onOpen}
          >
            <FaPlus />
            <Text>Tạo playlist mới</Text>
          </Flex>
        </Flex>

        <PlaylistModal isOpen={isOpen} onClose={onClose} />
      </GridItem>
    </Grid>
  );
}

const styles = {
  normalStyleTabList: {
    gap: 2,
    py: 3,
    pl: 6,
    w: '100%',
    color: 'gray.600',
    _hover: {
      color: 'white',
    },
    cursor: 'pointer',
  },
  onSelectedTabList: {
    color: 'white',
    bg: 'whiteAlpha.200',
    borderLeft: '2px solid #9b4de0',
    gap: 2,
    py: 3,
    pl: 6,
    w: '100%',
    cursor: 'pointer',
  },
};
