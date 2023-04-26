import { create } from "zustand"

export interface Device {
  isMobile: boolean
  isIos: boolean
  isKeyboardOpen: boolean
  isFireFox: boolean
}

interface Store {
  device: Device
  setDevice: (name: keyof Device, value: boolean) => void
}

export const useDeviceStore = create<Store>((set) => ({
  device: { isIos: false, isKeyboardOpen: false, isMobile: false, isFireFox: false },
  setDevice: (name, value) =>
    set(({ device }) => ({ device: { ...device, [name]: value } })),
}))
