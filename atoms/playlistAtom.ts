import { atom } from 'recoil'

export const playlistState = atom<SpotifyApi.PlaylistObjectFull | null>({
  key: 'playlistState',
  default: null,
})

export const playlistIdState = atom<string>({
  key: 'playlistIdState',
  default: '',
})
