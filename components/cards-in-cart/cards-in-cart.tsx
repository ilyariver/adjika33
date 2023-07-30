import style from './cards-in-cart.module.scss'
import { Philosopher } from 'next/font/google'
import { useEffect, useState } from 'react'

const philosopher = Philosopher({ subsets: ['cyrillic'], weight: ['400', '700'] })

const CardsInCart = ({ selectedProducts, className, callbackRemove }) => {
	const addRemoveButton = 'text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-2 ' +
		'focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-base px-4 py-2 text-center ' +
		'dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800' +
		'w-10 h-10'

	const counter = selectedProducts.reduce((acc, item) => {
		if (!acc.hasOwnProperty(item.id)) {
			acc[item.id] = 0;
		}
		acc[item.id]++;
		return acc;
	}, {});

	const table = {};
	const uniqSelectedProducts = selectedProducts.filter(({id}) =>(!table[id] && (table[id] = 1)));

	return (
		<ul className={style.products + ' ' + className}>
			{uniqSelectedProducts.map(item =>
				<li className={style.product + ' flex justify-between'} key={item.id}>
					<div className={style.content + ' flex'}>
						<img src={item.productImage} alt={item.productTitle} className={style.img}/>
						<div className={style.descr + ' ml-5'}>
							<div
								className={style.title + ' ' + philosopher.className + ' mb-5'}
							>{item.productTitle}</div>
							<div className={style.text}>{item.productDescription}</div>
						</div>
					</div>

					<div className={style.left + ' flex items-start'}>
						<div className={style.count + ' flex items-center mr-5'}>
							<button className={addRemoveButton + ' mr-2'}>-</button>
							<input type="text" value={counter[item.id]} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-10 h-full pl-4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
							<button className={addRemoveButton + ' ml-2'}>+</button>
						</div>
						<div className={style.cost + ' mr-5 ' + philosopher.className}>{item.productCost} руб.</div>

						<button className={style.remove} onClick={() => callbackRemove(item.id)}>
							<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
								 xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
								<path
									d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z"/>
							</svg>
						</button>
					</div>
				</li>)}

		</ul>
	)
}

export default CardsInCart
