import Proptypes from 'prop-types';

import { useEffect } from 'react';

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

RegisterModal.propTypes = {
  isOpen: Proptypes.bool,
  onClose: Proptypes.func,
};

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';

const RegisterSchema = Yup.object().shape({
  password: Yup.string().min(6, 'Too Short!').max(20, 'Too Long!').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  first_name: Yup.string().required('Required'),
  last_name: Yup.string().required('Required'),
  repassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

export default function RegisterModal({ isOpen, onClose }) {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      repassword: '',
      first_name: '',
      last_name: '',
    },
    validationSchema: RegisterSchema,
  });

  useEffect(() => {
    formik.resetForm();
  }, [isOpen]);

  const [showPwd, setShowPwd] = useState(false);
  const handleShowPwd = () => setShowPwd(!showPwd);
  const [showRePws, setShowRePws] = useState(false);
  const handleShowRePwd = () => setShowRePws(!showRePws);

  const toast = useToast();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formik.errors);

    if (formik.errors.email || !formik.touched.email) return;
    if (formik.errors.first_name || !formik.touched.first_name) return;
    if (formik.errors.last_name || !formik.touched.last_name) return;
    if (formik.errors.password || !formik.touched.password) return;
    if (formik.errors.repassword || !formik.touched.repassword) return;

    try {
      await requestApi('/auth/register', 'POST', formik.values);
      toast({
        title: 'Register in successfully!',
        status: 'success',
        position: 'top-right',
        isClosable: true,
        duration: 2000,
      });
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
      <ModalContent autoComplete="off" as="form" onSubmit={handleSubmit} bg="primaryBg">
        <ModalHeader color="white" fontWeight="bold" mx="auto">
          Đăng ký
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
            <FormControl isInvalid={formik.errors.first_name && formik.touched.first_name}>
              <Input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.first_name}
                color="white"
                borderRadius="full"
                autoComplete="none"
                px={4}
                py={2}
                id="first_name"
                name="first_name"
                type="text"
                bg="whiteAlpha.400"
                variant="unstyled"
                placeholder="first_name"
              />
              <FormErrorMessage ml={4}>{'*' + formik.errors.first_name}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={formik.errors.last_name && formik.touched.last_name}>
              <Input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.last_name}
                color="white"
                borderRadius="full"
                autoComplete="none"
                px={4}
                py={2}
                id="last_name"
                name="last_name"
                type="text"
                bg="whiteAlpha.400"
                variant="unstyled"
                placeholder="Last Name"
              />
              <FormErrorMessage ml={4}>{'*' + formik.errors.last_name}</FormErrorMessage>
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
            <FormControl isInvalid={formik.errors.repassword && formik.touched.repassword}>
              <InputGroup>
                <Input
                  color="white"
                  borderRadius="full"
                  px={4}
                  py={2}
                  id="repassword"
                  autoComplete="off"
                  name="repassword"
                  type={showRePws ? 'text' : 'password'}
                  bg="whiteAlpha.400"
                  variant="unstyled"
                  placeholder="Nhập Lại Mật Khẩu"
                  onChange={formik.handleChange}
                  value={formik.values.repassword}
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
                    onClick={handleShowRePwd}
                  >
                    {showRePws ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage ml={4}>{'*' + formik.errors.repassword}</FormErrorMessage>
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
