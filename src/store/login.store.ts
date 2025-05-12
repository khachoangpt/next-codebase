import { create } from 'zustand'

export type LoginStore = {
	openDialogForceLogin: boolean
	setOpenDialogForceLogin: (value: boolean) => void
}

export const useLoginStore = create<LoginStore>((set) => {
	const setOpenDialogForceLogin = (value: boolean) => {
		set({ openDialogForceLogin: value })
	}

	return {
		openDialogForceLogin: false,
		setOpenDialogForceLogin,
	}
})
