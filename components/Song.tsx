import React from 'react'
import { useRecoilState } from 'recoil'
import tw from 'twin.macro'
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom'
import useSpotify from '../hooks/useSpotify'
import { millisToMinutesAndSeconds } from '../lib/time'

interface ISong {
  track: SpotifyApi.PlaylistTrackObject
  order: number
}

const SongContainer = tw.div`
  grid
  grid-cols-2
  text-gray-500
  py-4
  px-5
  hover:bg-gray-900
  rounded-lg
  cursor-pointer
`

const SongInfoContainer = tw.div`
  flex
  items-center
  space-x-4
`

const SongName = tw.p`
  w-36
  lg:w-64
  text-white
  truncate
`

const ArtistName = tw.p`
  w-40
`

const AlbumInfoContainer = tw.div`
  flex
  items-center
  justify-between
  ml-auto
  md:ml-0
`

const AlbumName = tw.p`
  hidden
  md:inline
  w-40
`

const AlbumImage = tw.img`
  h-10
  w-10
`

const Song: React.FC<ISong> = ({ track, order }) => {
  const spotifyApi = useSpotify()
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)

  const playSong = () => {
    setCurrentTrackId(track.track.id)
    setIsPlaying(true)
    spotifyApi.play({
      uris: [track.track.uri],
    })
  }

  return (
    <SongContainer onClick={playSong}>
      <SongInfoContainer>
        <p>{order}</p>
        <AlbumImage src={track.track.album.images[0].url} alt="" />
        <div>
          <SongName>{track.track.name}</SongName>
          <ArtistName>{track.track.artists[0].name}</ArtistName>
        </div>
      </SongInfoContainer>
      <AlbumInfoContainer>
        <AlbumName>{track.track.album.name}</AlbumName>
        <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
      </AlbumInfoContainer>
    </SongContainer>
  )
}

export default Song
