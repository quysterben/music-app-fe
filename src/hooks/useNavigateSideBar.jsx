import { create } from 'zustand';

const useNavigateSideBar = create((set) => ({
  url: '/',
  setUrl: (newUrl) => {
    return set({
      url: newUrl,
    });
  },
}));

export default useNavigateSideBar;
