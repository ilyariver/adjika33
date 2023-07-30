import { Image } from './image'

export interface Section {
	image: Image & string
	title: string
	text: string
}
