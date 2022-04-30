import type { AppProps } from 'next/app'

import { SessionProvider } from 'next-auth/react'

import '../styles/globals.css'
import { GlobalStyles } from 'twin.macro'
import { RecoilRoot } from 'recoil'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <GlobalStyles />
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  )
}

export default MyApp
