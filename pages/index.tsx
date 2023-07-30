import { NextPage } from 'next'
import SectionCards from '../components/core/sections/Cards/Section-cards'
import SectionThird from '../components/core/sections/Third/Section-third'
import CartButton from '../components/cart-button/Cart-button'
import SectionFirst from '../components/core/sections/First/Section-first'
import { useEffect, useState } from 'react'
import useLocalStorage from '../hooks/use-local-storage'

const Home: NextPage = ({ data }) => {
    const [count, setCount] = useState(0)
    const [selectedProducts, setSelectedProducts, remove] = useLocalStorage('selectedProducts', [])
  function setTest(products) {
      setCount(products.length)
  }

  useEffect(() => {
      // setCount(selectedProducts.length)
  }, [])

  return (
      <>
        <SectionFirst { ...data.firstSection } />
        <SectionCards postData={data.productsList} setTest={setTest} count={count}/>
        <SectionThird { ...data.thirdSection } />

        {/*<ModalDetails />*/}
        {(count !== 0) && (<CartButton count={count}/>)}
        <button className="fixed bottom-5 right-5" onClick={() =>
            {
                setCount(0)
                setSelectedProducts([])
                remove()
            }
        }>X</button>
      </>
  )
}

export default Home;
export async function getServerSideProps() {
    const res = await fetch(`https://api.adjika33.ru/wp-json/wp/v2/pages?acf_format=standard`)
    const fullData = await res.json()
    if (!fullData) {
        return {
            notFound: true
        }
    }
    const firstSection = fullData[2].acf
    const productsList = fullData[1].acf
    const thirdSection = fullData[0].acf
    const contacts = fullData[3].acf
    const dataAcf = {
        firstSection,
        productsList,
        thirdSection,
        contacts
    }

    return {
        props: {
            data: dataAcf
        }
    }
}
