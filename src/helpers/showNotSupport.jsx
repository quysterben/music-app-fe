const showNotSupport = (toast) => {
  toast({
    title: 'Chức năng đang được phát triển',
    description: 'Vui lòng quay lại sau',
    status: 'warning',
    duration: 2000,
    isClosable: true,
    position: 'top-right',
  });
};

export default showNotSupport;
