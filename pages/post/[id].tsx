import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import Sidebar from '../../components/Sidebar'

const Post: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  console.log(id)
  return (
    <div className="">
      <Head>
        <title>Spotify Clone - Post</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        Post: {id}
        {/* Side bar */}
        <Sidebar />
        {/* Center */}
      </main>
      {/* Player */}
      <div></div>
    </div>
  )
}

export default Post
