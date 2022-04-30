import { ChevronDownIcon } from '@heroicons/react/outline'
import { signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import tw from 'twin.macro'
import { shuffle } from 'lodash'
import { useRecoilState, useRecoilValue } from 'recoil'
import { playlistIdState, playlistState } from '../atoms/playlistAtom'
import useSpotify from '../hooks/useSpotify'
import SongList from './SongList'

const CenterContainer = tw.main`
  flex-grow
  h-screen
  overflow-y-scroll
  scrollbar-hide
`

const Header = tw.header`
  absolute
  top-5
  right-8
`

const UserInfoContainer = tw.div`
  flex
  items-center
  space-x-3
  opacity-80
  hover:opacity-90
  cursor-pointer
  rounded-full
  p-1
  pr-2
  bg-black
  text-white
`

const UserImage = tw.img`
  rounded-full
  w-10
  h-10
`

const Banner = tw.section`
  flex
  items-end
  space-x-7
  bg-gradient-to-b
  to-black
  h-80
  text-white
  p-8
`

const PlayListImg = tw.img`
  h-44
  w-44
  shadow-2xl
`

const PlayListTitle = tw.h1`
  text-2xl 
  font-bold 
  md:text-3xl 
  xl:text-4xl
`

const colorClass: string[] = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
]

const Center: React.FC = () => {
  const { data: session } = useSession()
  const [color, setColor] = useState<string>('')
  const playlistId = useRecoilValue<string>(playlistIdState)
  const [playlist, setPlaylist] =
    useRecoilState<SpotifyApi.PlaylistObjectFull | null>(playlistState)
  const spotifyApi = useSpotify()

  console.log('playlist', playlist)

  useEffect(() => {
    setColor(shuffle(colorClass).pop() || '')
  }, [playlistId])

  useEffect(() => {
    ;(async () => {
      try {
        if (!spotifyApi.getAccessToken() && !playlistId) return
        const data = await spotifyApi.getPlaylist(playlistId)
        setPlaylist(data.body)
      } catch (error) {
        console.log('Something went wrong!!', error)
      }
    })()
  }, [spotifyApi, playlistId])

  return (
    <CenterContainer>
      <Header>
        <UserInfoContainer onClick={() => signOut()}>
          <UserImage src={session?.user?.image || ''} alt="" />
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </UserInfoContainer>
      </Header>
      <Banner className={color}>
        <PlayListImg src={playlist?.images?.[0].url} />
        <div>
          <p>PLAYLIST</p>
          <PlayListTitle>{playlist?.name}</PlayListTitle>
        </div>
      </Banner>
      <SongList />
    </CenterContainer>
  )
}

export default Center
