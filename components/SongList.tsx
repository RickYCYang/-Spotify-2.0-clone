import tw from 'twin.macro'
import { useRecoilValue } from 'recoil'
import { playlistState } from '../atoms/playlistAtom'
import Song from './Song'

const SongListContainer = tw.section`
  text-white
  px-8
`

const SongListInnerContainer = tw.ul`
  flex
  flex-col
  space-y-1
  pb-28
`

const SongList: React.FC = () => {
  const playlist = useRecoilValue<SpotifyApi.PlaylistObjectFull | null>(
    playlistState
  )
  return (
    <SongListContainer>
      <SongListInnerContainer>
        {playlist?.tracks.items.map((track, index) => (
          <li key={track.track.id}>
            <Song track={track} order={index + 1} />
          </li>
        ))}
      </SongListInnerContainer>
    </SongListContainer>
  )
}

export default SongList
