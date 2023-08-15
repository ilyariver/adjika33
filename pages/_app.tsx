import '../styles/globals.scss'

import App, { AppContext, AppInitialProps, AppProps } from 'next/app'
import Header from '../components/core/header/Header'
import { Bellota } from 'next/font/google'
import Footer from '../components/core/footer/Footer'
import Head from 'next/head'
export const bellota = Bellota({ subsets: ['cyrillic'], weight: ['400', '700'] })

type AppPropsWithLayout = AppProps & {
    Component: any
    pageProps: any
    headerApi: any
}

function MyApp({ Component, pageProps, headerApi }: AppPropsWithLayout) {
  return (
      <div className={bellota.className}>
          <Head>
              <title>Доставка горячего шашлыка, вкусной еды во Владимире | Аджика.</title>
              <meta name="yandex-verification" content="eaf7646179b9c4af" />
              <meta name="google-site-verification" content="vNeViD2l3TdKMFVj6wbz0fAq5rpupMLiRmjnobU9NJE" />
              <meta name="description" content="Блюда на мангале из свежей, фермерской свинины, баранины, говядины, курицы и овощей! Быстрая доставка с пылу-жару с 12.00 до 22.00! Самовывоз с ул. Горького, 40" />
          </Head>
          <Header {...headerApi} />
          <Component {...pageProps} />
          <Footer {...headerApi} />
      </div>
  )
}

export default MyApp

MyApp.getInitialProps = async (
    context: AppContext
): Promise<any & AppInitialProps> => {
    const ctx = await App.getInitialProps(context)
    const res = await fetch(`https://api.adjika33.ru/wp-json/wp/v2/pages/54?acf_format=standard`)
    const fullData = await res.json()
    if (!fullData) {
        return {
            notFound: true
        }
    }
    const dataAcf = fullData.acf

    return {
        ...ctx,
        headerApi: dataAcf
    }
}
