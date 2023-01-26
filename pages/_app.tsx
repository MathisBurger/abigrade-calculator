import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import HeaderNavbar from "../components/landing/HeaderNavbar";
import { IntlProvider } from "react-intl";
import { useRouter } from "next/router";

import de from "../lang/de.json";

const messages = {
 de
};

function getDirection(locale: string|undefined): string {
  if (locale === "de") {
    return "rtl";
  }

  return "ltr";
}

export default function App({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();
  return (
      <IntlProvider locale={locale ?? 'de'} messages={messages["de"]}>
        <HeaderNavbar>
          <Component {...pageProps} dir={getDirection(locale)} />
        </HeaderNavbar>
      </IntlProvider>
  )
}
