import { atom } from 'recoil'

export const currentTrackIdState = atom<string>({
  key: 'currentTrackIdState',
  default: '',
})

export const isPlayingState = atom<boolean>({
  key: 'isPlayingState',
  default: false,
})
