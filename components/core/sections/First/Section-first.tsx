import style from './Section-first.module.scss'
import { Philosopher } from 'next/font/google'

const philosopher = Philosopher({ subsets: ['cyrillic'], weight: ['400', '700'] })
export default function SectionFirst(data) {
	const { title, text , image } = data

	return (
		<section className={style.section}>
			<div className="section__container">
				<div className={style.wrap}>
					<div className={style.left}>
						<h2 className={style.title + ' ' + philosopher.className} dangerouslySetInnerHTML={{
							__html: title
						}}></h2>
						<p className={style.text}>{ text }</p>
					</div>
					<div className={style.right}>
						<img src={image.url} alt={image.alt} className={style.img} />
					</div>
				</div>
			</div>
		</section>
	);
}
