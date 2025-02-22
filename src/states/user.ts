import {create} from 'zustand'

interface UserState {
  user: {
    id: number,
    address: string,
    role: string,
  }
  setUser: (newUser: {
    id: number,
    address: string,
    role: string,
  }) => void,
  clearUser: () => void
}

const useUserStore = create<UserState>()((set) => ({
  user: {
    id: 0,
    address: '',
    role: ''
  },
  setUser: (newUser) => set({user: newUser}),
  clearUser: () => set({user: {id: 0, address: '', role: ''}})
}))

export default useUserStore


