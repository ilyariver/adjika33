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
		<div className={style.card + ' ' + (cost === '0' ? style.disable : '')}>
			<div className={style.top}>
				<Image width={800} height={404} src={image} alt={name} className={style.img } />
			</div>
			<div className={style.middle}>
				<h3 className={`${style.name} ${philosopher.className}`}>{ name }</h3>
				{cost !== '0' && <p className={style.description} title={description}>{description}</p>}
				{cost === '0' && <p className={style.description}>Скоро появиться в продаже</p>}
			</div>

			{cost !== '0' && <div className={style.bottom}>
				<div className={style.cost + ' ' + philosopher.className}>{cost} руб.</div>
				<ButtonOrder onClick={onClick} className={style.button_order}/>
			</div>}
		</div>
	)
}

export default Card
