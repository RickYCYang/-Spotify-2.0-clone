import useSpotify from './useSpotify'
import { currentTrackIdState } from '../atoms/songAtom'
import { useRecoilState } from 'recoil'
import { useEffect, useState } from 'react'

const useSongInfo = () => {
  const spotifyApi = useSpotify()
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)
  const [songInfo, setSongInfo] = useState<SpotifyApi.TrackObjectFull>()

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentTrackId) {
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentTrackId}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            },
          }
        ).then((res) => res.json())
        setSongInfo(trackInfo)
      }
    }
  }, [currentTrackId, spotifyApi])

  return songInfo
}

export default useSongInfo
