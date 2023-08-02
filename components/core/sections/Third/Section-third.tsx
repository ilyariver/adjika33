import { FC, useEffect, useState } from 'react'
import style from './Section-third.module.scss'
import { Philosopher } from 'next/font/google'
import Image from 'next/image'
import { Section } from '../../../../types/section'

const philosopher = Philosopher({ subsets: ['cyrillic'], weight: ['400', '700'] })
const SectionThird: FC<Section> = (data) => {
	const [view, setView] = useState(false)
	const [img, setImg] = useState('')
	const { image1, image2, title, text } = data

	const openView = (link: string) => {
		setView(old => !old)

		view ? setImg('') : setImg(link)
	}

	useEffect(() => {
		if (view) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
	}, [view]);

	return (
		<section className={style.section}>

			{view && <div className={style.view} onClick={() => openView(image1)}>
				<Image width="800" height="800" src={img} className={style.view_image} alt="меню"/>
			</div>}

			<div className="section__container">
				<div className={style.wrap}>
					<div className={style.left}>
						<Image width="800" height="800" src={image1} className={style.img} alt="меню" onClick={() => openView(image1)}/>
						<Image width="800" height="800" src={image2} className={style.img} alt="меню" onClick={() => openView(image2)}/>
					</div>

					<div className={style.right}>
						<h2 className={style.title + ' ' + philosopher.className} dangerouslySetInnerHTML={{
							__html: title
						}}></h2>
						<p className={style.text} dangerouslySetInnerHTML={{
							__html: text
						}}></p>
					</div>
				</div>
			</div>
		</section>
	);
}

export default SectionThird
