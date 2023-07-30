import { Card } from './card'

export interface Cards {
	currentProductsList: Card[]
	sendToCart: (id: string) => void
}
