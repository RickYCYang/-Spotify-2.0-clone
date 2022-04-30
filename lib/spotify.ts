import SpotifyWebApi from 'spotify-web-api-node'

type TScopes =
  // Images
  | 'ugc-image-upload'

  // Spotify Connect
  | 'user-modify-playback-state'
  | 'user-read-playback-state'
  | 'user-read-currently-playing'

  // Follow
  | 'user-follow-modify'
  | 'user-follow-read'

  // Listening History
  | 'user-read-recently-played'
  | 'user-read-playback-position'
  | 'user-top-read'

  // Playlists
  | 'playlist-read-collaborative'
  | 'playlist-modify-public'
  | 'playlist-read-private'
  | 'playlist-modify-private'

  // Playback
  | 'app-remote-control'
  | 'streaming'

  // Users
  | 'user-read-email'
  | 'user-read-private'

  // Library
  | 'user-library-read'
  | 'user-library-modify'

const scopesArr: TScopes[] = [
  'user-read-email',
  'playlist-read-private',
  'playlist-read-collaborative',
  'streaming',
  'user-read-private',
  'user-library-read',
  'user-top-read',
  //'user-library-modify',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'user-read-recently-played',
  'user-follow-read',
]

const scopes = scopesArr.join(',')

const queryParamString = new URLSearchParams({
  scopes: scopes,
}).toString()

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString}`

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
})

//console.log('LOGIN_URL', LOGIN_URL)

export default spotifyApi
export { LOGIN_URL }
