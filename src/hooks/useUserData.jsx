import { create } from 'zustand';

const useUserData = create((set) => ({
  userData: {
    id: null,
    first_name: null,
    last_name: null,
    email: null,
    avatar: null,
    role: null,
  },
  initUserData: (data) => {
    console.log(data);
    const newData = {
      id: data.id,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      avatar: data.avatar,
      role: data.role,
    };
    return set({ userData: newData });
  },
}));

export default useUserData;
