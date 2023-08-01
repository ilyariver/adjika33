import { NextPage } from 'next'
import SectionCards from '../components/core/sections/Cards/Section-cards'
import SectionThird from '../components/core/sections/Third/Section-third'
import CartButton from '../components/cart-button/Cart-button'
import SectionFirst from '../components/core/sections/First/Section-first'
import { useCallback, useEffect, useState } from 'react'
import useLocalStorage from '../hooks/use-local-storage'

const Home: NextPage = ({ data }: any) => {
    const [scrollY, setScrollY] = useState(0);
    const [count, setCount] = useState(0)
    const [currentProductsList, setCurrentProductsList] = useLocalStorage('currentProductsList', [])
    const [selectedProducts, setSelectedProducts, remove] = useLocalStorage('selectedProducts', [])
    const [productCards, setProductCards] = useState(currentProductsList)

    const { productCard } = data.productsList
    const sendToCart = id => {
        setSelectedProducts([...selectedProducts, currentProductsList.find(item => item.id === id)])
    }

    const saveToLocalStorage = () => {
        setCurrentProductsList([])
        setCurrentProductsList([...productCards])
    }

    useEffect(() => {
        saveToLocalStorage()
        setProductCards(productCard)
    }, [scrollY])

    const onScroll = useCallback(event => {
        setScrollY(event);
    }, []);

    useEffect(() => {
        //add eventlistener to window
        window.addEventListener("scroll", onScroll, { passive: true });
        // remove event on unmount to prevent a memory leak with the cleanup
        return () => {
            window.removeEventListener("scroll", onScroll);
        }
    }, []);

    return (
        <>
            <SectionFirst { ...data.firstSection } />
            <SectionCards currentProductsList={currentProductsList} sendToCart={sendToCart} />
            <SectionThird { ...data.thirdSection } />

            {/*<ModalDetails />*/}
            {(selectedProducts.length !== 0) && (<CartButton count={selectedProducts.length}/>)}
            {(selectedProducts.length !== 0) && <button className="fixed bottom-5 right-5" onClick={() => {
                setCount(0)
                setSelectedProducts([])
                remove()
            }}>x</button>}
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
