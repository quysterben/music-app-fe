import Proptypes from 'prop-types';

import useUserData from '../../../../hooks/useUserData';

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
  FormControl,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';

import requestApi from '../../../../utils/api';

LoginModal.propTypes = {
  isOpen: Proptypes.bool,
  onClose: Proptypes.func,
};

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';

const LoginSchema = Yup.object().shape({
  password: Yup.string().min(6, 'Too Short!').max(20, 'Too Long!').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

export default function LoginModal({ isOpen, onClose }) {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
  });

  const [showPwd, setShowPwd] = useState(false);
  const handleShowPwd = () => setShowPwd(!showPwd);

  const initUserData = useUserData((state) => state.initUserData);
  const toast = useToast();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formik.errors.email || !formik.touched.email) return;
    if (formik.errors.password || !formik.touched.password) return;

    try {
      const res = await requestApi('/auth/login', 'POST', formik.values);
      toast({
        title: 'Logged in successfully!',
        status: 'success',
        position: 'top-right',
        isClosable: true,
        duration: 2000,
      });
      localStorage.setItem('accessToken', res.data.result.tokens.access_token);
      localStorage.setItem('refreshToken', res.data.result.tokens.refresh_token);
      localStorage.setItem('userId', res.data.result.id);
      const userDataRes = await requestApi('/users/curr/info', 'GET');
      initUserData(userDataRes.data.result);
      onClose();
      formik.resetForm();
    } catch (err) {
      toast({
        title: err.response.data.message,
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
      <ModalContent as="form" onSubmit={handleSubmit} bg="primaryBg">
        <ModalHeader color="white" fontWeight="bold" mx="auto">
          Đăng Nhập
        </ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody>
          <VStack spacing="4">
            <FormControl isInvalid={formik.errors.email && formik.touched.email}>
              <Input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                color="white"
                borderRadius="full"
                autoComplete="off"
                px={4}
                py={2}
                id="email"
                name="email"
                type="text"
                bg="whiteAlpha.400"
                variant="unstyled"
                placeholder="Email"
              />
              <FormErrorMessage ml={4}>{'*' + formik.errors.email}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={formik.errors.password && formik.touched.password}>
              <InputGroup>
                <Input
                  color="white"
                  borderRadius="full"
                  px={4}
                  py={2}
                  id="password"
                  autoComplete="off"
                  name="password"
                  type={showPwd ? 'text' : 'password'}
                  bg="whiteAlpha.400"
                  variant="unstyled"
                  placeholder="Mật Khẩu"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                />
                <InputRightElement>
                  <Button
                    px="1.4rem"
                    mr="1.2rem"
                    h="1.75rem"
                    bg="whiteAlpha.200"
                    _hover={{ bg: 'whiteAlpha.300' }}
                    size="sm"
                    onClick={handleShowPwd}
                  >
                    {showPwd ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage ml={4}>{'*' + formik.errors.password}</FormErrorMessage>
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            size="md"
            bg={'purplePrimary'}
            color="white"
            rounded="full"
            w="full"
            type="submit"
            _hover={{ bg: 'purple.500' }}
          >
            Đăng nhập
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
