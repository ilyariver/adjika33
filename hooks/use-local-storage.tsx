import { useCallback, useState } from 'react'

const useLocalStorage = (key: string, initialValue: any) => {
	const [state, setState] = useState(() => {
		// Initialize the state
		try {
			if (typeof window !== 'undefined') {
				const value = localStorage.getItem(key)
			// Check if the local storage already has any values,
			// otherwise initialize it with the passed initialValue
			return value ? JSON.parse(value) : initialValue
			}
		} catch (error) {
			console.log(error)
		}
	})

	const setValue = (value: any) => {
		try {
			// If the passed value is a callback function,
			//
			if (typeof window !== 'undefined') {
			const valueToStore = value instanceof Function ? value(state) : value
				localStorage.setItem(key, JSON.stringify(valueToStore))
			setState(value)
			}
		} catch (error) {
			console.log(error)
		}
	}

	const remove = useCallback(() => {
		try {
			localStorage.removeItem(key);
		} catch (error) {
			console.log(error);
		}
	}, [key])

	return [state, setValue, remove]
}

export default useLocalStorage
