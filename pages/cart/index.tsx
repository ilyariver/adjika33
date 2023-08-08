import { FC, FormEvent, useEffect, useState } from 'react'
import style from './Cart.module.scss'
import { Philosopher } from 'next/font/google'
import { Metadata } from 'next'
import useLocalStorage from '../../hooks/use-local-storage'
import CardsInCart from '../../components/cards-in-cart/cards-in-cart'
import Link from 'next/link'
import getCities from '../../common/da-data-addresses'
import Input from 'react-phone-number-input/input'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Card } from '../../types/card'
import Image from 'next/image'

const philosopher = Philosopher({ subsets: ['cyrillic'], weight: ['400', '700'] })

export const metadata: Metadata = {
	title: 'Корзина',
	description: 'Ресторан кавказской кухни',
}
const Cart: FC = () => {
	const [selectedProducts, setSelectedProducts] = useLocalStorage('selectedProducts', [])
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [address, setAddress] = useState('')
	const [toast, setToast] = useState<boolean>(false)
	const [spinner, setSpinner] = useState<boolean>(false)
	const [listAddresses, setListAddresses] = useState([])
	const [phoneValidate, setPhoneValidate] = useState<boolean>(false)
	const [counter, setCounter] = useState<any>({})
	const [selectProduct, setSelectProduct] = useState([])

	const router = useRouter();



	const sum = selectProduct.reduce((acc, item) => {
		return acc += +item.productCost
	}, 0)

	const callbackRemove = id => {
		setSelectedProducts([])
		setSelectedProducts(selectProduct.filter(item => item.id !== id))
	}

	const table: {id: number} = {id: 0};
	const uniqSelectedProducts = selectProduct.filter(({id}) =>
		(!table[id as keyof typeof table] && (table[id as keyof typeof table] = 1)));
	const count = () => {}

	const callbackIncreaseDecrease = (product: Card, type: 'increase' | 'decrease') => {
		switch (type) {
			case 'increase':
				setSelectedProducts([...selectedProducts, product])
				break
			case 'decrease':
				const index = selectedProducts.findIndex(item => item.id === product.id)
				if (index !== -1) {
					selectedProducts.splice(index, 1)
					setSelectedProducts([...selectedProducts])
				}
				break
			default:
				break
		}
	}

	const changeNameField = (e: any) => {
		let targetValue = ''
		targetValue = e.target.value
		setName(targetValue)
	}

	const searchAddresses = (e: any) => {
		let targetValue = ''
		targetValue = e.target.value
		const data = getCities(targetValue)

		data.then(res => {
			setListAddresses(res.suggestions)
		})
		setAddress(targetValue)
	}

	const checkAddress = (str: string) => {
		setListAddresses([])
		setAddress(str)
	}

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		const data = {
			name,
			phone,
			address,
			uniqSelectedProducts,
			counter,
			sum,
		}

		console.log(data)

		if (data.phone.length < 12) {
			setPhoneValidate(true)
		} else {
			setPhoneValidate(false)
			sendMessageToTelegram(data)
		}
	}

	function sendMessageToTelegram(data: any) {
		setSpinner(true)
		const TOKEN = '6564291032:AAGIkAkDu6NjymO_kTlN6jeGCRo-C2vmDZc'
		const CHAT_ID = '-1001980695297'
		const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`

		let message = `<strong>Новый онлайн заказ!</strong>\n`
		message += `<i>                                 </i>\n`
		message += `<b>Отправитель: </b> <i>${data.name}</i>\n`
		message += `<i>                                 </i>\n`
		message += `<b>Телефон клиента для подтверждения заказа: </b><i>${data.phone}</i>\n`
		message += `<i>                                 </i>\n`
		message += `<b>Адрес доставки: </b><i>${data.address}</i>\n`
		message += `<i>__________________________</i>\n`
		message += `<b>Заказ:</b>\n`
		data.uniqSelectedProducts.forEach(product => {
			message += `<b>- </b><i>${product.productTitle}</i> <b>(${counter[product.id]}шт.)</b> - ${product.productCost} руб.\n`
		})
		message += `<i>__________________________</i>\n`
		message += `<i>Итого: </i><b>${data.sum} руб.</b>`

		console.log(message)
		axios.post(URI_API, {
			chat_id: CHAT_ID,
			parse_mode: 'html',
			text: message
		})
			.then(res => {
				setToast(true)
				clearAll()
				const replace = setTimeout(() => {
					router.push('/');
					clearTimeout(replace)
				}, 4000)
			})
			.catch(error => {
				console.error(error.message)
			})
			.finally(() => {
				setSpinner(false)
			})
	}

	function clearAll() {
		setSelectedProducts([])
		setName('')
		setPhone('')
		setAddress('')
	}

	function onClose() {
		setToast(false)
	}

	useEffect(() => {
		const timeoutToast = setTimeout(() => setToast(false), 10_000)

		return () => {
			clearTimeout(timeoutToast)
		}
	}, [toast])

	useEffect(() => {
		const counter = selectedProducts.reduce((acc: number, item) => {
			if (!acc.hasOwnProperty(item.id)) {
				acc[item.id] = 0;
			}
			acc[item.id]++;
			return acc;
		}, {});

		setCounter(counter)
	}, [selectedProducts])


	useEffect(() => {
		if (spinner || toast) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
	}, [spinner, toast]);

	useEffect(() => {
		setSelectProduct(selectedProducts)
	}, [selectedProducts])

	const inputStyles = 'bg-transparent border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'

	return (
		<div className={style.cart}>
			{
				spinner && <div className={spinner ? style.spinnerBack : ''}>
					<div role="status">
						<svg aria-hidden="true"
							 className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
							 viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
								fill="currentColor"/>
							<path
								d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
								fill="currentFill"/>
						</svg>
						<span className="sr-only">Loading...</span>
					</div>
				</div>
			}

			{toast && <div className={style.toast}>
				<div className={style.toast_body}>
				  	<div className={style.toast_close} onClick={onClose}>
						<Image src="/images/close.svg" width={25} height={25} alt="Закрыть"></Image>
					</div>
					<div className={style.toast_title + ' ' + philosopher.className}>Спасибо за заказ</div>
				  	<div className={style.toast_svg}>
					 	<Image src="/images/spinner.svg" width={150} height={150} alt="знак загрузки" />
					</div>
					<div className={style.toast_text}>Мы уже начали готовить вашу еду <span className={style.toast_heart}>♡</span></div>
				</div>
			</div>}

			<div className="cart__container">
				<h2 className={style.title + ' mb-5 ' + philosopher.className}>Заказ</h2>
				<div className="border-b opacity-10 mb-5"></div>

				{selectProduct.length === 0 && <div className={style.empty}>
					<div className={style.empty_text}>Корзина пуста...</div>
					<Link
					  href="/#cards"
					  className={style.at_home + ' text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2'}
					>Оформить заказ</Link>
				</div>}

				{selectProduct.length !== 0 && <>
					<CardsInCart
					  callbackRemove={callbackRemove}
					  callbackIncreaseDecrease={callbackIncreaseDecrease}
					  selectedProducts={selectProduct}
					  counter={counter}
					  count={count}
					  uniqSelectedProducts={uniqSelectedProducts}
					  className="mb-10"
					/>

					<div className={style.total}>
						<div className={style.total_wrap + ' mb-10'}>
							<div className="d">Итого:</div>
							<div className={style.between}></div>
							<div className={style.sum + ' ' + philosopher.className}>{sum} руб.</div>
						</div>

						<div className={style.total_wrap + ' mb-5'}>
							<div className="d">Доставка:</div>
							<div className={style.between}></div>
							<div className={style.sum + ' ' + philosopher.className}>150 руб.</div>
						</div>
					</div>

					<form onSubmit={handleSubmit} className={style.form} >

					  <div className={style.wrap}>
						<div className="relative w-full mb-10">
							<label
								htmlFor="first_name"
								className={philosopher.className + ' ' + style.label}
							>Ваше имя:</label>
							<input
								type="text"
								id="first_name"
								className={inputStyles + ' ' + style.label}
								value={name}
								onInput={changeNameField}
								required
							/>
						</div>

						<div className="relative w-full mb-10">
							<label htmlFor="phone" className={philosopher.className + ' ' + style.label}>Ваш телефон:</label>
							<Input
								className={inputStyles + ' ' + style.label}
								minLength="16"
								maxLength="16"
								required
								country="RU"
								international
								withCountryCallingCode
								value={phone}
								onChange={(value: string) => {
								setPhone(value)
								setPhoneValidate(false)
								}}
							/>
								{phoneValidate && <div className={style.error}>Кажется здесь не хватает цифр телефона</div>}
						</div>

						<label htmlFor="simple-search"className={philosopher.className + ' ' + style.label}>Доставить по адресу:</label>

						<div className="relative w-full mb-10">
							<div
								className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
							<input
								type="text"
								id="simple-search"
								className={inputStyles + ' ' + style.label}
								required
								value={address}
								placeholder="Название улицы..."
								onInput={searchAddresses}
							/>

							{listAddresses.length !== 0 && <div
								className="absolute z-10 w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
								{listAddresses.map((address, idx) =>
									<a
										key={address.value}
										onClick={() => checkAddress(address.value)}
										className={'block w-full px-4 py-2 text-white bg-blue-700 border-b border-gray-200 cursor-pointer dark:bg-gray-800 dark:border-gray-600 ' + (idx === 0 ? 'rounded-t-lg ' : ' ') + (idx === (listAddresses.length - 1) ? 'rounded-b-lg ' : '')}
									>{address.value}</a>
								)}
							</div>}

						</div>

						<button
							type="submit"
							className={'text-white mb-5 bg-blue-400 dark:bg-blue-500 font-medium rounded-lg px-5 py-2.5 text-center ' + style.label + ' ' + style.send_btn}
						>Оформить заказ</button>
						<ul className={style.notes}>
							<li>Доставка осуществляется с 12 до 22 (мск).</li>
							<li>От 1500 руб. бесплатно, иначе оплачивается курьеру Яндекс самостоятельно.</li>
							<li>Самовывоз - бесплатно.</li>
						</ul>
					  </div>

					  <div className={philosopher.className + ' ' + style.stock}>
						При заказе от
						1500 руб. морс в подарок
					  </div>
					</form>

				</>}
			</div>
		</div>
	)
}
