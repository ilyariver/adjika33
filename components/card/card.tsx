import style from './Card.module.scss'
import { Philosopher } from 'next/font/google'
import ButtonOrder from '../../components/shared/button-order/Button-order'
import Image from 'next/image'

const philosopher = Philosopher({ subsets: ['cyrillic'], weight: ['400', '700'] })

const Card = ({ name, description, cost, image, onClick }: {
	name: string
	description: string
	cost: string
	image: string
	onClick: () => void
}) => {


	return (
		<div className={style.card}>
			<div className={style.top}>
				<Image width={540} height={404} src={image} alt="Шашлык машлык" className={style.img } />
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
