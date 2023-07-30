import '../styles/globals.scss'

import App, { AppContext, AppInitialProps, AppProps } from 'next/app'
import Header from '../components/core/header/Header'
import { Bellota } from 'next/font/google'
import Footer from '../components/core/footer/Footer'
import { useEffect, useState } from 'react'
export const bellota = Bellota({ subsets: ['cyrillic'], weight: ['400', '700'] })

type AppPropsWithLayout = AppProps & {
    Component: any
    pageProps: any
    headerApi: any
}

function MyApp({ Component, pageProps, headerApi }: AppPropsWithLayout) {
    const [isClient, setIsClient] = useState(false)
    useEffect(() => {
        setIsClient(true)
    }, [])
  return (
      <>
          {isClient && (<div className={bellota.className}>
              <Header {...headerApi} />
              <Component {...pageProps} />
              <Footer {...headerApi} />
          </div>)}
      </>
  )
}

export default MyApp

MyApp.getInitialProps = async (
    context: AppContext
): Promise<any & AppInitialProps> => {
    const ctx = await App.getInitialProps(context)
    const res = await fetch(`https://api.adjika33.ru/wp-json/wp/v2/pages/54`)
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
