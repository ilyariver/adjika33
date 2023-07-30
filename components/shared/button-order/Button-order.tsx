import style from './Button-order.module.scss'
import { Philosopher } from 'next/font/google'

const philosopher = Philosopher({ subsets: ['cyrillic'], weight: ['400', '700'] })
const ButtonOrder = (props: {onClick?: () => void}) => {
	return (
		<button className={style.button + ' ' + philosopher.className} onClick={props.onClick}>
			<svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M18.5 7.5L17.7896 4.89465C17.5157 3.89005 17.3787 3.38775 17.0978 3.00946C16.818 2.63273 16.4378 2.34234 16.0008 2.17152C15.5619 2 15.0413 2 14 2M3.5 7.5L4.2104 4.89465C4.48432 3.89005 4.62128 3.38775 4.90221 3.00946C5.18199 2.63273 5.56216 2.34234 5.99922 2.17152C6.43808 2 6.95872 2 8 2" stroke="white" strokeWidth="2"/>
				<path d="M8 2C8 1.44772 8.44772 1 9 1H13C13.5523 1 14 1.44772 14 2C14 2.55228 13.5523 3 13 3H9C8.44772 3 8 2.55228 8 2Z" stroke="white" strokeWidth="2"/>
				<path d="M7 11V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
				<path d="M15 11V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
				<path d="M11 11V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
				<path d="M2.864 14.4552C3.40967 16.6379 3.68251 17.7292 4.49629 18.3646C5.31008 19 6.435 19 8.68486 19H13.3155C15.5654 19 16.6903 19 17.5041 18.3646C18.3179 17.7292 18.5907 16.6379 19.1364 14.4552C19.9943 11.0234 20.4233 9.3075 19.5225 8.1538C18.6217 7 16.853 7 13.3155 7H8.68486C5.14745 7 3.37875 7 2.47791 8.1538C1.94912 8.831 1.87855 9.702 2.08398 11" stroke="white" strokeWidth="2" strokeLinecap="round"/>
			</svg>
			<span className={style.text}>Заказать</span>
		</button>
	)
}

export default ButtonOrder
