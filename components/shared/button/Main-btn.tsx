import { FC } from 'react'
import style from './Main-btn.module.scss'

type ButtonType = {
	text: string,
	className: string
}

const MainBtn: FC<ButtonType> = ({ text, className }) => {
	return (
		<button className={`${style.button} ${className}`}>
			{ text }
		</button>
	)
}

export default MainBtn
