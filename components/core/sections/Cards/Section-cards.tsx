import style from './Section-cards.module.scss'
import Card from '../../../../components/card/card'
import { Cards } from '../../../../types/cards'

export default function SectionCards(cards: Cards) {
	const { currentProductsList, sendToCart } = cards

	return (
		<section className={style.cards} id="cards">
			{currentProductsList.map(item => <Card
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
