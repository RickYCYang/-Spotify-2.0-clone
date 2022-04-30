import type { NextPage } from 'next'
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
} from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth/providers'
import tw from 'twin.macro'
import Image from 'next/image'

type TProvider = {
  name: string
  id: string
  type: string
  signinUrl: string
  callbackUrl: string
}

interface ILoginProps {
  providers: {
    provider: TProvider
  }
}

const LoginContainer = tw.div`
  flex
  flex-col
  justify-center
  items-center
  bg-black
  min-h-screen
`

const LogoImg = tw.img`
  mb-5 w-52
`

const SpotifyButton = tw.button`
  bg-[#18D860]
  text-white
  p-5
  rounded-full
  hover:bg-green-500
`

const Login: NextPage<ILoginProps> = ({ providers }) => {
  return (
    <LoginContainer>
      <LogoImg src="https://links.papareact.com/9xl" alt="" />
      {Object.values(providers).map((provider) => (
        <div key={provider.id}>
          <SpotifyButton
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}
          >
            Login with {provider.name}
          </SpotifyButton>
        </div>
      ))}
    </LoginContainer>
  )
}

export default Login

export async function getServerSideProps() {
  const providers = await getProviders()
  //console.log('providers', providers)
  return {
    props: {
      providers,
    },
  }
}
