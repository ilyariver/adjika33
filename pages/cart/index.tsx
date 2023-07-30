import { FC } from 'react'
import style from './Cart.module.scss'
import { Philosopher } from 'next/font/google'
import { Metadata } from 'next'
import useLocalStorage from '../../hooks/use-local-storage'
import CardsInCart from '../../components/cards-in-cart/cards-in-cart'
import Link from 'next/link'

const philosopher = Philosopher({ subsets: ['cyrillic'], weight: ['400', '700'] })

export const metadata: Metadata = {
	title: 'Корзина',
	description: 'Ресторан кавказской кухни',
}
const Cart: FC = () => {
	const [selectedProducts, setSelectedProducts] = useLocalStorage<Array<any>>('selectedProducts', [])

	const sum = selectedProducts.reduce((acc, item) => {
		return acc += +item.productCost
	}, 0)

	const callbackRemove = id => {
		setSelectedProducts([])
		setSelectedProducts(selectedProducts.filter(item => item.id !== id))
	}

	return (
		<div className={style.cart}>
			<div className="cart__container">
				<h2 className={'mb-5 ' + style.title + ' ' + philosopher.className}>Заказ</h2>
				<div className="border-b opacity-10 mb-5"></div>

				{selectedProducts.length === 0 && <div className={style.empty}>
					<div className={style.empty_text}>Корзина пуста...</div>
					<Link
					  href="/#cards"
					  className={style.at_home + ' text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2'}
					>Оформить заказ</Link>
				</div>}

				{selectedProducts.length !== 0 && <>
					<CardsInCart
					  callbackRemove={callbackRemove}
					  selectedProducts={selectedProducts}
					  className="mb-10"
					/>

					<div className="border-b opacity-10 mb-5"></div>

					<div className={style.total_wrap + ' mb-10'}>
						<div className="d">Итого:</div>
						<div className={style.between}></div>
						<div className={style.sum + ' ' + philosopher.className}>{sum} руб.</div>
					</div>

					<div className={style.total_wrap}>
						<div className="d">Доставка:</div>
						<div className={style.between}></div>
						<div className={style.sum + ' ' + philosopher.className}>150 руб.</div>
					</div>
				</>}
			</div>
		</div>
	)
}

export default Cart
