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
    const [selectProducts, setSelectProducts] = useState([])
    const [productList, setProductList] = useState([])


    const sendToCart = id => {
        setSelectedProducts([...selectedProducts, currentProductsList.find(item => item.id === id)])
    }

    const onScroll = useCallback(event => {
        setScrollY(event);
    }, []);

    useEffect(() => {
        setCurrentProductsList([])
        setCurrentProductsList([...productCards])
        setProductCards(data.productsList.productCard)
    }, [scrollY])

    useEffect(() => {
        //add eventlistener to window
        window.addEventListener("scroll", onScroll, { passive: true });
        // remove event on unmount to prevent a memory leak with the cleanup
        return () => {
            window.removeEventListener("scroll", onScroll);
        }
    }, []);


    useEffect(() => {
        setSelectProducts(selectedProducts)
    }, [selectedProducts])

    useEffect(() => {
        setProductList(currentProductsList)
    }, [currentProductsList])

    return (
        <>
            <SectionFirst { ...data.firstSection } />
            <SectionCards currentProductsList={productList} sendToCart={sendToCart} />
            <SectionThird { ...data.thirdSection } />

            {/*<ModalDetails />*/}
            {(selectProducts.length !== 0) && (<CartButton count={selectProducts.length}/>)}
            {(selectProducts.length !== 0) && <button className="fixed bottom-5 right-5" onClick={() => {
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
