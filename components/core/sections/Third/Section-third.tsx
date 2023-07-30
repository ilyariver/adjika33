import { FC } from 'react'
import style from './Section-third.module.scss'
import { Philosopher } from 'next/font/google'

const philosopher = Philosopher({ subsets: ['cyrillic'], weight: ['400', '700'] })
const SectionThird: FC = (data) => {
	const { image, title, text } = data

	return (
		<section className={style.section}>
			<div className="section__container">
				<div className={style.wrap}>
					<div className={style.left}>
						<img src={image} className={style.img} />
					</div>

					<div className={style.right}>
						<h2 className={style.title + ' ' + philosopher.className}>{ title }</h2>
						<p className={style.text}>{ text }</p>
					</div>
				</div>
			</div>
		</section>
	);
}

export default SectionThird
