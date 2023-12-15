import { Image } from './image'

export interface Section {
	image?: Image & string
	image1?: Image & string
	image2?: Image & string
	centerImage?: Image & string
	title: string
	text: string
}
