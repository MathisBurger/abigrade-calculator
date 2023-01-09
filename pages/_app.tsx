import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import HeaderNavbar from "../components/landing/HeaderNavbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <HeaderNavbar>
        <Component {...pageProps} />
      </HeaderNavbar>
  )
}
