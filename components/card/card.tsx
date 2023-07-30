import { useState } from 'react'
import style from './Card.module.scss'
import { Philosopher } from 'next/font/google'
import ButtonOrder from '../../components/shared/button-order/Button-order'

const philosopher = Philosopher({ subsets: ['cyrillic'], weight: ['400', '700'] })

const Card = ({ name, description, cost, image, onClick }) => {


	return (
		<div className={style.card}>
			<div className={style.top}>
				<img src={image} alt="Шашлык машлык" className={style.img }/>
			</div>
			<div className={style.middle}>
				<h3 className={`${style.name} ${philosopher.className}`}>{ name }</h3>
				<p className={style.description} title={description}>{ description }</p>
			</div>

			<div className={style.bottom}>
				<div className={style.cost + ' ' + philosopher.className}>{cost} руб.</div>
				<ButtonOrder onClick={onClick}/>
			</div>
		</div>
	)
}

export default Card
