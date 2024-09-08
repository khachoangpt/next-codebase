import { create } from 'zustand'

type LoginState = {
  loadingLogin: boolean
  setLoadingLogin: (loadingLogin: boolean) => void
}

export const useLoginStore = create<LoginState>((set) => ({
  loadingLogin: false,
  setLoadingLogin: (loadingLogin: boolean) => set({ loadingLogin }),
}))
