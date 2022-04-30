import type { GetServerSideProps, NextPage } from 'next'
import tw from 'twin.macro'
import Head from 'next/head'
import Sidebar from '../components/Sidebar'
import Center from '../components/Center'
import { getSession } from 'next-auth/react'
import Player from '../components/Player'

const HomeContainer = tw.div`
  bg-black
  h-screen
  overflow-hidden
`

const MainContainer = tw.div`
  flex
`

const PlayerContainer = tw.div`
  sticky
  bottom-0
`

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Spotify Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeContainer>
        <MainContainer>
          <Sidebar />
          <Center />
        </MainContainer>
        <PlayerContainer>
          <Player />
        </PlayerContainer>
      </HomeContainer>
    </>
  )
}
export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = getSession(context)
  return {
    props: session,
  }
}
