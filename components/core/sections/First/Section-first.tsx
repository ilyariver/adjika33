import style from './Section-first.module.scss'
import { Philosopher } from 'next/font/google'
import Image from 'next/image'
import { Section } from '../../../../types/section'

const philosopher = Philosopher({ subsets: ['cyrillic'], weight: ['400', '700'] })
export default function SectionFirst(data: Section) {
	const { title, text , image, centerImage } = data
	console.log('centerImage', centerImage);
	
	return (
		<section className={style.section}>
			<div className="section__container">
				<div className={style.wrap}>
					{title && <div className={style.left}>
						<div className={style.title + ' ' + philosopher.className} dangerouslySetInnerHTML={{
							__html: title
						}}></div>
						<p className={style.text}>{text}</p>
					</div>}
					{image.url && <div className={style.right}>
						<Image width="800" height="800" src={image.url} alt={image.alt} className={style.img} />
					</div>}
				</div>

				{centerImage && <div className={style.centerImage}>
					<Image
						width="800"
						height="800"
						src={centerImage.url}
						alt={centerImage.alt}
						className={style.centerImageImg}
					/>
				</div>}
			</div>
		</section>
	);
}
