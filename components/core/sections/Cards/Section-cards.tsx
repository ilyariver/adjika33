import { useEffect, useState } from 'react'
import style from './Section-cards.module.scss'
import Card from '../../../../components/card/card'
import useLocalStorage from '../../../../hooks/use-local-storage'

export default function SectionCards(cards) {
	const [currentProductsList, setCurrentProductsList] = useLocalStorage('currentProductsList', [])
	const [selectedProducts, setSelectedProducts] = useLocalStorage('selectedProducts', [])
	const [productCards, setProductCards] = useState(currentProductsList)
	const [productList, setProductsList] = useState([])

	const { productCard } = cards.postData

	const saveToLocalStorage = () => {
		setCurrentProductsList(productCards)
	}

	const sendToCart = id => {
		setProductsList([...selectedProducts, currentProductsList.find(item => item.id === id)])
	}

	useEffect(() => {
		if (productList.length !== 0) {
			setSelectedProducts([...productList] )
		}
	}, [productList])

	useEffect(() => {
		cards.setTest(selectedProducts)
	}, [selectedProducts])

	useEffect(() => {
		saveToLocalStorage()
		setProductCards(productCard)
	}, [cards])

	useEffect(() => {
		if (cards.count === 0) {
			setProductsList([])
			setSelectedProducts([])
		}
	}, [cards.count])


	return (
		<section className={style.cards} id="cards">
			{productCard.map(item => <Card
				key={item.id}
				name={item.productTitle}
				description={item.productDescription}
				cost={item.productCost}
				image={item.productImage}
				onClick={() => {
					sendToCart(item.id)
				}}
			/>)}
			<div className={style.empty_card}></div>
		</section>
	)
}
