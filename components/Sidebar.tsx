import React, { useEffect, useState } from 'react'
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
} from '@heroicons/react/outline'
import tw from 'twin.macro'
import { signOut, useSession } from 'next-auth/react'
import useSpotify from '../hooks/useSpotify'
import { useRecoilState } from 'recoil'
import { playlistIdState } from '../atoms/playlistAtom'

const NavContainer = tw.nav`
  h-screen
  overflow-y-scroll
  border-r
  border-gray-900
  px-5
  scrollbar-hide
  sm:max-w-[12rem]
  lg:max-w-[15rem]
  hidden
  md:block
  pb-36
`

const NavListContainer = tw.ul`
  text-gray-500
  py-5
  text-xs
  lg:text-sm
  space-y-4
`

const NavItem = tw.li`
  cursor-pointer
  hover:text-white
`

const NavButton = tw.button`
  flex
  items-center
  space-x-2
`

const Divider = tw.hr`
  border-t-[0.1px]
  border-gray-900
`

const Playlist = tw.p`
  cursor-pointer
  hover:text-white
`

const Sidebar: React.FC = () => {
  const { data: session, status } = useSession()
  const [playlists, setPlaylists] = useState<SpotifyApi.PlaylistBaseObject[]>(
    []
  )
  const [playlistId, setPlaylistId] = useRecoilState<string>(playlistIdState)
  const spotifyApi = useSpotify()

  console.log('session', session)
  console.log('status', status)
  console.log(playlistId)

  useEffect(() => {
    ;(async () => {
      if (spotifyApi.getAccessToken()) {
        const data = await spotifyApi.getUserPlaylists()
        setPlaylists(data.body.items)
        setPlaylistId(data?.body?.items?.[0].id)
      }
    })()
  }, [session, spotifyApi])

  return (
    <NavContainer>
      <NavListContainer>
        {/* <NavItem>
          <NavButton onClick={() => signOut()}>
            <p>Log out</p>
          </NavButton>
        </NavItem> */}
        <NavItem>
          <NavButton>
            <HomeIcon className="h-5 w-5" />
            <p>Home</p>
          </NavButton>
        </NavItem>
        <NavItem>
          <NavButton>
            <SearchIcon className="h-5 w-5" />
            <p>Search</p>
          </NavButton>
        </NavItem>
        <NavItem>
          <NavButton>
            <LibraryIcon className="h-5 w-5" />
            <p>Your Library</p>
          </NavButton>
        </NavItem>
      </NavListContainer>
      <Divider />
      <NavListContainer>
        <NavItem>
          <NavButton>
            <PlusCircleIcon className="h-5 w-5" />
            <p>Create Playlist</p>
          </NavButton>
        </NavItem>
        <NavItem>
          <NavButton>
            <HeartIcon className="h-5 w-5" />
            <p>Liked Songs</p>
          </NavButton>
        </NavItem>
        <NavItem>
          <NavButton>
            <RssIcon className="h-5 w-5" />
            <p>Your Episodes</p>
          </NavButton>
        </NavItem>
      </NavListContainer>
      <Divider />
      <NavListContainer>
        {/* Playlist */}
        {playlists.map((playlist: SpotifyApi.PlaylistBaseObject) => (
          <Playlist
            key={playlist.id}
            onClick={() => {
              setPlaylistId(playlist.id)
            }}
          >
            {playlist.name}
          </Playlist>
        ))}
      </NavListContainer>
    </NavContainer>
  )
}

export default Sidebar
