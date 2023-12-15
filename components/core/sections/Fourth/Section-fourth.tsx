import { FC, useEffect, useState } from 'react'
import style from './Section-fourth.module.scss'
import { Philosopher } from 'next/font/google'
import Image from 'next/image'
import {Fourth} from "../../../../types/fourth";

const philosopher = Philosopher({ subsets: ['cyrillic'], weight: ['400', '700'] })
const SectionFourth: FC<Fourth> = (data) => {
	const [previewImg, setPreviewImg] = useState<string>(null);
	const { title, photos } = data

	function openPreview(url) {
		setPreviewImg(url)
	}

	return (
		<section className={style.section}>
			<div className="section__container">
				<h2 className={style.title + ' ' + philosopher.className}>{ title }</h2>

				<div className={style.photos}>
					{photos.map(photo =>
						<Image
							key={photo.url}
							width="250"
							height="200"
							src={photo.url}
							alt={photo.alt}
							className={style.img}
							onClick={() => openPreview(photo.url)}
						/>
					)}
					<div className={style.img}></div>
					<div className={style.img}></div>
				</div>
			</div>

			{previewImg && <div className={style.preview} onClick={() => openPreview(null)}>
				<Image
					src={previewImg}
					alt="Превью"
					width="800"
					height="800"
					className={style.previewImg}

				/>
			</div>}
		</section>
	);
}

export default SectionFourth
