import { FC, useState } from 'react'
import style from './Modal-details.module.scss'
import { Philosopher } from 'next/font/google'
import ButtonOrder from '../../../components/shared/button-order/Button-order'
import Image from 'next/image'

const philosopher = Philosopher({ subsets: ['cyrillic'], weight: ['400', '700'] })
const ModalDetails: FC = () => {
	const [isActive, setIsActive] = useState(true)
	const buttonCloseStyles = 'bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 ' +
		'hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'

	const setToggleWindow = () => {
		setIsActive(!isActive)
	}

	return (
		<div className={style.popup + ' ' + (isActive ? style.active : '')}>
			<div className={style.body}>
				<div className={style.content}>
					<button
						type="button"
						className={style.button + ' ' + buttonCloseStyles}
						aria-label="закрыть окно"
						onClick={setToggleWindow}
					>
						<span className="sr-only">Close menu</span>
						<svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
							 stroke="currentColor" aria-hidden="true">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
								  d="M6 18L18 6M6 6l12 12"/>
						</svg>
					</button>

					<div className={style.wrap}>
						<div className={style.image_wrap}>
							<Image width={540} height={404} src="/images/food.jpg" alt="еда" className={style.image} />
						</div>

						<div className={style.description}>
							<h3 className={style.title + ' ' + philosopher.className}>Горячая сковорода с курицей.</h3>
							<p className={style.text}>
								Горячая сковорода с курицей в перечном соусе. 320 гр. Горячая сковорода с курицей в перечном соусе. 320 гр.
							</p>
							<div className={style.cost + ' ' + philosopher.className}>420 руб.</div>
							<ButtonOrder />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ModalDetails
