import {
  SwitchHorizontalIcon,
  VolumeUpIcon as VolumeDownIcon,
} from '@heroicons/react/outline'
import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  RewindIcon,
  VolumeUpIcon,
} from '@heroicons/react/solid'
import { debounce } from 'lodash'

import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useCallback } from 'react'
import { useRecoilState } from 'recoil'
import tw from 'twin.macro'
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom'
import useSongInfo from '../hooks/useSongInfo'
import useSpotify from '../hooks/useSpotify'

const PlayerContainer = tw.div`
  h-24
  bg-gradient-to-b
  from-black
  to-gray-900
  text-white
  grid
  grid-cols-3
  text-xs
  md:text-base
  px-2
  md:px-8
`

const SongInfoContainer = tw.div`
  flex
  items-center
  space-x-4
`

const AlbumImage = tw.img`
  hidden
  md:inline
  h-10
  w-10
`

const MediaContainer = tw.div`
  flex
  items-center
  justify-evenly
`

const VolumeContainer = tw.div`
  flex
  items-center
  space-x-3
  md:space-x-4
  justify-end
`

const VolumeRangeInput = tw.input`
  w-14
  md:w-28
`

const Player = () => {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const [volume, setVolume] = useState<number>(50)
  const songInfo = useSongInfo()

  const fetchCurrentSong = async () => {
    if (!songInfo) {
      const track = await spotifyApi.getMyCurrentPlayingTrack()
      console.log('now playing: ', track.body.item)
      setCurrentTrackId(track?.body?.item?.id || '')
      const playback = await spotifyApi.getMyCurrentPlaybackState()
      setIsPlaying(playback?.body?.is_playing)
    }
  }

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      // fetchCurrentSong()
      setVolume(50)
    }
  }, [currentTrackId, spotifyApi, session])

  const handlePlayPause = async () => {
    const playbackState = await spotifyApi.getMyCurrentPlaybackState()
    if (playbackState.body.is_playing) {
      spotifyApi.pause()
      setIsPlaying(false)
    } else {
      spotifyApi.play()
      setIsPlaying(true)
    }
  }

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume)
    }
  }, [volume])

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume)
    }, 500),
    []
  )

  return (
    <PlayerContainer>
      <SongInfoContainer>
        <AlbumImage src={songInfo?.album?.images?.[0].url} alt="" />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0].name}</p>
        </div>
      </SongInfoContainer>
      <MediaContainer>
        <SwitchHorizontalIcon className="button" />
        <RewindIcon className="button" />
        {isPlaying ? (
          <PauseIcon onClick={handlePlayPause} className="button h-10 w-10" />
        ) : (
          <PlayIcon onClick={handlePlayPause} className="button h-10 w-10" />
        )}
        <FastForwardIcon className="button" />
        <ReplyIcon className="button" />
      </MediaContainer>
      <VolumeContainer>
        <VolumeDownIcon
          className="button"
          onClick={() => volume > 0 && setVolume(volume - 10)}
        />
        <VolumeRangeInput
          type="range"
          value={volume}
          min={0}
          max={100}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
        <VolumeUpIcon
          className="button"
          onClick={() => volume < 100 && setVolume(volume + 10)}
        />
      </VolumeContainer>
    </PlayerContainer>
  )
}

export default Player
